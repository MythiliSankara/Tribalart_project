var callOnLoad = function() {
//     console.log(buyers)
//     var container_div = "<div class='container'>"
//     var row_div = "<div class='row'>"
//     var column_div = "<div class='col-md-12'>"
//     var table_div = "<table class='table'><thead><tr><th scope='col'>Buyers</th></tr></thead><tbody>"
//     $.each(buyers, function(index, buyer){
//         var tr_tag = "<tr><th scope='row'><div><a href='/buyer/"+buyer['name']+"'</a>"+buyer['name']+"</div></th>"
//         // var link = "<div><a href='/buyer/"+buyer["b.name"]+"'</a>"+buyer["b.name"]+"</div>"
//         // var name_tag = "<td>"+link+"</td>"
//         var tr_end = "</tr>"
//         var table_element_tag = tr_tag + tr_end
//         table_div = table_div + table_element_tag
//     })
//     var end_tags = "</tbody></table></div></div></div>"
//     var whole_html = container_div + row_div + column_div + table_div + end_tags
//     $("#title").append(whole_html)
// }

// $(document).ready(function() {
//     callOnLoad()
// })
    var container_div = "<div class='container'>"
    var row_div = "<div class='row'>"
    var column_div = "<div class='col-md-12'>"
    var table_div = "<table class='table'><thead><tr><th scope='col'>ID</th><th scope='col'>Buyer</th></tr></thead><tbody>"
    $.each(buyers, function(index, buyer){
        var tr_tag = "<tr><th scope='row'>"+buyer["user_id"]+"</th>"
        var link = "<div><a href='/buyer/"+buyer["user_id"]+"'</a>"+buyer["name"]+"</div>"
        var name_tag = "<td>"+link+"</td>"
        var tr_end = "</tr>"
        var table_element_tag = tr_tag + name_tag + tr_end
        table_div = table_div + table_element_tag
    })
    var end_tags = "</tbody></table></div></div></div>"
    var whole_html = container_div + row_div + column_div + table_div + end_tags
    $("#title").append(whole_html)
}

$(document).ready(function() {
    callOnLoad()
})