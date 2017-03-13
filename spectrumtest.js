function sortTable(n) {
    let table, rows, swap, i, fst, snd, shouldSwap, order, switchcount = 0;
    table = document.getElementById("dataTable");
    swap = true;
    //Set the sorting direction to ascending:
    order = "ascend";

    while (swap === true) { // do until all sorted
        swap = false;
        rows = table.getElementsByTagName("TR");
        // Bubble sort
        for (i = 1; i < (rows.length - 1) ; i++) {
            shouldSwap = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            fst = rows[i].getElementsByTagName("TD")[n];
            snd = rows[i + 1].getElementsByTagName("TD")[n];

            // check the order of sort
            if (order === "ascend") {
                if (fst.innerHTML.toLowerCase() > snd.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwap = true;
                    break;
                }
            } else if (order === "descend") {
                if (fst.innerHTML.toLowerCase() < snd.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwap = true;
                    break;
                }
            }
        }
        if (shouldSwap === true) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            swap = true;
            switchcount++;
        } else {
            if (switchcount == 0 && order == "ascend") {
                order = "descend";
                swap = true;
            }
        }
    }
}

$(document).ready(function () {
    let str;

    $.getJSON('https://api.myjson.com/bins/1011p3')
    .done(function (json) {
        let tr;
        str = json; //grab the json for autocomplete
        for (let i = 0; i < json.length; i++) {
            tr = $('<tr/>');
            let img = document.createElement('img');
            img.src = json[i].picture;
            tr.append(img);
            tr.append("<td>" + json[i].name.last +  ", " + json[i].name.first + "</td>");
            tr.append("<td>" + json[i].age + "</td>");
            tr.append("<td>" + json[i].phone + "</td>");
            tr.append("<td>" + json[i].friends.length + "</td>");
            for (let j = 0; j < json[i].tags.length; j++) {
                tr.append("<td>" + json[i].tags[j] + "<br />" + "</td>");
            }
            $('#dataTable').append(tr);
        }
    })
    .fail(function (jqXhr, textStatus, error) {
        alert("ERROR: " + textStatus + " error: " + error);
    });

    let userdata = {
        url: 'https://api.myjson.com/bins/1011p3',
        getValue: 'name',
        list: {
            match: {
                enabled: true
            }
        }
    };


    // applied typeahead to the text input box
    $('#search-input').autocomplete({
        source: function(req, add) {                    
                //pass request to server
            $.getJSON("https://api.myjson.com/bins/1011p3?", req, function (data) {
                    //create array for response objects
                    let suggestions = [];
                    let names = [];
                    
                    //process response
                    $.each(data, function(i, val){                              
                        names.push(val.name.first + " " + val.name.last);
                    });

                    //filter response
                    for (i = 0; i < names.length; i++)
                        if (names[i].toLowerCase().indexOf(req.term.toLowerCase()) !== -1) suggestions.push(names[i]); // assuming string guaranteed

                    //pass array to callback
                    add(suggestions);
                });
        },
    });

});