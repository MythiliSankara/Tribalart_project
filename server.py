#!/usr/bin/env python2.7


"""
Columbia W4111 Intro to databases
Example webserver
To run locally
    python server.py
Go to http://localhost:8111 in your browser
A debugger such as "pdb" may be helpful for debugging.
Read about it online.
"""

import os
from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask import Flask, request, render_template, g, redirect, Response, url_for

tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app = Flask(__name__, template_folder=tmpl_dir)



# Use the DB credentials you received by e-mail
DB_USER = "ns3305"
DB_PASSWORD = "J85pu9FmC6"

DB_SERVER = "w4111.cisxo09blonu.us-east-1.rds.amazonaws.com"

DATABASEURI = "postgresql://"+DB_USER+":"+DB_PASSWORD+"@"+DB_SERVER+"/w4111"


#
# This line creates a database engine that knows how to connect to the URI above
#
engine = create_engine(DATABASEURI)


# Here we create a test table and insert some values in it
# engine.execute("""DROP TABLE IF EXISTS test;""")
# engine.execute("""CREATE TABLE IF NOT EXISTS test (
#   id serial,
#   name text
# );""")
# engine.execute("""INSERT INTO test(name) VALUES ('grace hopper'), ('alan turing'), ('ada lovelace');""")



@app.before_request
def before_request():
  """
  This function is run at the beginning of every web request 
  (every time you enter an address in the web browser).
  We use it to setup a database connection that can be used throughout the request
  The variable g is globally accessible
  """
  try:
    g.conn = engine.connect()
  except:
    print "uh oh, problem connecting to database"
    import traceback; traceback.print_exc()
    g.conn = None

@app.teardown_request
def teardown_request(exception):
  """
  At the end of the web request, this makes sure to close the database connection.
  If you don't the database could run out of memory!
  """
  try:
    g.conn.close()
  except Exception as e:
    pass


#
# @app.route is a decorator around index() that means:
#   run index() whenever the user tries to access the "/" path using a GET request
#
# If you wanted the user to go to e.g., localhost:8111/foobar/ with POST or GET then you could use
#
#       @app.route("/foobar/", methods=["POST", "GET"])
#
# PROTIP: (the trailing / in the path is important)
# 
# see for routing: http://flask.pocoo.org/docs/0.10/quickstart/#routing
# see for decorators: http://simeonfranklin.com/blog/2012/jul/1/python-decorators-in-12-steps/
#
@app.route('/')
def index():
  return redirect(url_for('home'))

#The home page

@app.route('/home')
def home():
  # sql_string = text("""SELECT tribe_name from tribe;""")
  # cursor = g.conn.execute(sql_string)
  # tribes = process_results(cursor)
  # cursor.close()
  # context = dict(tribes=tribes)
  #return render_template("home.html", **context)

  sql_string_image = text("""SELECT artlink,art_name,artwork_id from artwork;""")
  cursor = g.conn.execute(sql_string_image)
  tribe_art = process_results(cursor)
  cursor.close()
  context = dict(tribe_art=tribe_art)
  return render_template("home.html", **context)


# The artist page
#select user_id, name from art_user where user_id in (select user_id from artwork where artwork_id='ARW1005');
@app.route('/artists')
def artists():
  sql_string = text("""SELECT user_id, name from artist;""")
  cursor = g.conn.execute(sql_string)
  artists = process_results(cursor)
  cursor.close()
  context = dict(artists=artists)
  return render_template("artists.html", **context)

# Artist and buyer details

@app.route('/artist/<user_id>')
def artist(user_id=None):
  # user_id = user_id.strip()
  user_id = str(user_id)
  sql_artist = text("""SELECT name,mobile_no,email_id from artist where user_id=:user_id;""")
  cursor = g.conn.execute(sql_artist, user_id=user_id)
  artist = process_results(cursor)
  print(artist)
  cursor.close()

  sql_art = text("""SELECT b.name as Buyer, s.name as Seller from Art_User b, Art_User s, artwork a, transaction_history t, buyer_has bh where b.user_id=bh.user_id and s.user_id=a.user_id and t.trans_id=bh.trans_id and t.artwork_id=a.artwork_id and s.user_id=:user_id;""")
  cursor = g.conn.execute(sql_art, user_id=user_id)
  art = process_results(cursor)
  cursor.close()

  context = dict(artist=artist, art=art)
  return render_template("artist.html", **context)

#The tribes page

@app.route('/tribes')
def tribes():
  sql_string = text("""SELECT tribe_id,tribe_name from tribe;""")
  cursor = g.conn.execute(sql_string)
  tribes = process_results(cursor)
  cursor.close()
  context = dict(tribes=tribes)
  return render_template("tribes.html", **context)

# The tribe and artists detailed page

@app.route('/tribe/<tribe_id>')
def tribe(tribe_id=None):
  tribe_id = str(tribe_id)
  sql_art = text("""SELECT name,email_id,mobile_no from artist where tribe_id=:tribe_id;""")
  cursor = g.conn.execute(sql_art, tribe_id=tribe_id)
  artist_details = process_results(cursor)
  cursor.close()
  context = dict(artist_details=artist_details)
  return render_template("tribe.html", **context)

# The buyers page

@app.route('/buyers')
def buyers():
  sql_string = text("""SELECT b.user_id,b.name from art_user b, art_user s, artwork a, transaction_history t, buyer_has bh where b.user_id=bh.user_id and s.user_id=a.user_id and t.trans_id=bh.trans_id and t.artwork_id=a.artwork_id;""")
  cursor = g.conn.execute(sql_string)
  buyers = process_results(cursor)
  cursor.close()
  context = dict(buyers=buyers)
  return render_template("buyers.html", **context)

@app.route('/buyer/<user_id>')
def buyer(user_id=None):
  print("below should be the user_id")
  user_id = str(user_id)
  print(user_id)
  sql_buy = text("""SELECT u.name,a.art_name,b.date_of_purchase,b.total_amount from art_user u,artwork a,buyer_has b,transaction_history t where u.user_id=b.user_id and b.trans_id=t.trans_id and t.artwork_id=a.artwork_id and u.user_id=:user_id""")
  cursor = g.conn.execute(sql_buy, user_id=user_id)
  buyer_details = process_results(cursor)
  cursor.close()
  print(buyer_details)
  context = dict(buyer_details=buyer_details)
  return render_template("buyer.html", **context)


@app.route('/transaction')
def transaction():
  print("check this out")
  sql_string = text("""SELECT b.trans_id,u.name,a.art_name,t.date_of_purchase,t.total_no_of_items,t.total_amount from art_user u,buyer_has b,transaction_history t,artwork a where u.user_id=b.user_id 
and b.trans_id=t.trans_id and t.artwork_id=a.artwork_id;""")
  cursor = g.conn.execute(sql_string)
  transaction_details = process_results(cursor)
  cursor.close()
  context = dict(transaction_details=transaction_details)
  return render_template("transaction.html", **context) 









def process_results(cursor):
  values = []

  for result in cursor:
    val = {}
    for key, value in result.items():
      val[key] = value
    values.append(val)

  return values



if __name__ == "__main__":
  import click

  @click.command()
  @click.option('--debug', is_flag=True)
  @click.option('--threaded', is_flag=True)
  @click.argument('HOST', default='0.0.0.0')
  @click.argument('PORT', default=8111, type=int)
  def run(debug, threaded, host, port):
    """
    This function handles command line parameters.
    Run the server using
        python server.py
    Show the help text using
        python server.py --help
    """

    HOST, PORT = host, port
    print "running on %s:%d" % (HOST, PORT)
    app.run(host=HOST, port=PORT, debug=debug, threaded=threaded)


  run()
