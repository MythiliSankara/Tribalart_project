var callOnLoad = function(){
    var divs = []
        var container_div = "<div class='container ex'>"
        var row_div = "<div class='row'>"
        var result_div = "<div class='result'>"
        var info_div1 = "<div class='col-md-12 name'>"+ artwork['art_name'] +"</div>"
        console.log(exhibit['eximg'])
        var image_div = "<div class='col-md-12' class='image_div'><img class='center-block' src="+artwork['artlink']+" alt='Responsive image' id='main_image'></img></div>"
        var divs = [container_div, row_div, result_div, info_div1, image_div]
        if (exhibit['experiod'] !== undefined) {
          var info_div2 = "<div class='col-md-12'>Period "+ exhibit['experiod'] +"</div>"
          divs.push(info_div2)
        }
        if (exhibit['exvalue'] !== undefined) {
          var info_div3 = "<div class='col-md-12'>Value $"+ exhibit['exvalue'] +"</div>"
          divs.push(info_div3)
        }
        if (exhibit['arid'] !== undefined) {
          var link_artist = "<div class='col-md-12'><a href='/artist/"+exhibit['arid']+"' id='show_artist'>Show Artist</a></div>"
          divs.push(link_artist)
        }
        var whole_html = ""
        $.each(divs, function(i, div){
          whole_html = whole_html + div
        })

        var ending_tags = "</div></div></div>"
        whole_html = whole_html + ending_tags
        $("#exh").append(whole_html)
  }