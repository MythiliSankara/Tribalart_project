var callOnLoad = function() {
    var container_div = "<div class='container'>"
    var row_div = "<div class='row'>"
    var column_div = "<div class='col-md-12'>"
    var table_div = "<table class='table'><thead><tr><th scope='col'>Artwork</th></tr></thead><tbody>"
    $.each(tribe_art, function(index, tribe){
        var tr_tag = "<tr><th scope='row'><div><a href='/artwork/"+tribe["artwork_id"]+"'</a>"+tribe["art_name"]+"</div></th></tr>"
        // var link = "<div><a href='/artwork/"+tribe["artwork_id"]+"'</a>"+tribe["artwork_id"]+"</div>"
        // var name_tag = "<td>"+link+"</td>"
        //var tr_end = "</tr>"
        //var table_element_tag = + tr_end
        table_div = table_div + tr_tag
    })
    var end_tags = "</tbody></table></div></div></div>"
    var whole_html = container_div + row_div + column_div + table_div + end_tags
    $("#table_header").append(whole_html)
}

$(document).ready(function() {
    callOnLoad()
})
