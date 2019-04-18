var callOnLoad = function() {
    console.log(buyer_details)
    // $.each(buyer_details, function(index, buyer_deets){
    //     // var tr_tag = "<tr><th scope='row'>"+buyer_deets["name"]+buyer_deets["art_name"]+buyer_deets["date_of_purchase"]+buyer_deets["total_amount"]+</th>"
    //     // //var link = "<div><a href='/buyer/"+["buyer"]+"'</a>"+artist["name"]+"</div>"
    //     // var tr_end = "</tr>"
    //     // var table_element_tag = tr_tag + tr_end
    //     // table_div = table_div + table_element_tag
    //     var name_div="<div>Name: "+buyer_deets['name']+"\nArt Name: "+buyer_deets['art_name']+"\nDate of Purchase:"+buyer_deets['date_of_purchase']+"\nTotal Amount:"+buyer_deets['total_amount']+"</div>"
    //     $("#buysell").append(name_div)
    // })

    var container_div = "<div class='container'>"
    var row_div = "<div class='row'>"
    var column_div = "<div class='col-md-12'>"
    var table_div = "<table class='table'><thead><tr><th scope='col'>Artwork</th><th scope='col'>Date of Purchase</th><th scope='col'>Total Amount</th></tr></thead><tbody>"
    $.each(buyer_details, function(index, buyer_detail){

        var shit_div = `    <tr>
      <th scope="col">`+buyer_detail["art_name"]+`</th>
      <th scope="col">`+buyer_detail["date_of_purchase"]+`</th>
      <th scope="col">`+buyer_detail["total_amount"]+`</th>
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

// $(document).ready(function() {
//     callOnLoad()
// })
//     // create separate divs for each name, mobile   
//     // var container_div = "<div class='container'>"
//     // var row_div = "<div class='row'>"
//     // var column_div = "<div class='col-md-12'>"
//     // var table_div = "<table class='table'><thead><tr><th scope='col'>Buyers</th></tr></thead><tbody>"
//     // $.each(art, function(index, ar){
//     //     var tr_tag = "<tr><th scope='row'>"+ar["buyer"]+"</th>"
//     //     //var link = "<div><a href='/artist/"+artist["Seller"]+"'</a>"+artist["name"]+"</div>"
//     //     var tr_end = "</tr>"
//     //     var table_element_tag = tr_tag + tr_end
//     //     table_div = table_div + table_element_tag
//     // })
//     // var end_tags = "</tbody></table></div></div></div>"
//     // var whole_html = container_div + row_div + column_div + table_div + end_tags
    
// }

$(document).ready(function() {
    callOnLoad()
})