var callOnLoad = function() {
   //console.log(artist)
  //  $.each(artist_details,function(index,artist_details){
    //    var name_div="<div>Name: "+single_artist['name']+"\nMobile no.: "+single_artist['mobile_no']+"\nEmail id: "+single_artist['email_id']+"</div>"
        
      //  $("#placeholder").append(name_div)
    //})
    // $.each(artist, function(index, artist){
    //     var tr_tag = "<tr><th scope='row'>"+artist["name"]+artist["mobile_no"]+artist["email_id"]+</th>"
    //     //var link = "<div><a href='/artist/"+artist["Seller"]+"'</a>"+artist["name"]+"</div>"
    //     var tr_end = "</tr>"
    //     var table_element_tag = tr_tag + tr_end
    //     table_div = table_div + table_element_tag
    // })

    //create separate divs for each name, mobile
    
    var container_div = "<div class='container'>"
    var row_div = "<div class='row'>"
    var column_div = "<div class='col-md-12'>"
    var table_div = "<table class='table'><thead><tr><th scope='col'>artist</th><th scope='col'>email_id</th><th scope='col'>mobile_no</th></tr></thead><tbody>"
    $.each(artist_details, function(index, artist_detail){

        var shit_div = `    <tr>
      <th scope="col">`+artist_detail["name"]+`</th>
      <th scope="col">`+artist_detail["email_id"]+`</th>
      <th scope="col">`+artist_detail["mobile_no"]+`</th>
        </tr>`





        // var tr_tag = "<tr><th scope='row'>"+ar["buyer"]+"</th>"
        // var link = "<div><a href='/tribe/"+artist_details["name"]+"'</a>"+artist_details["email_id"]+"</div>"
        // var tr_end = "</tr>"
        //var table_element_tag = tr_tag + tr_end
        table_div = table_div + shit_div
    })
    var end_tags = "</tbody></table></div></div></div>"
    var whole_html = container_div + row_div + column_div + table_div + end_tags
    $("#buysell").append(whole_html)
}

$(document).ready(function() {
    callOnLoad()
})