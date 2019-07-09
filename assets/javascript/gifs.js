var APIKEY = "r5LKlZAX8M9bKFtNjmL86BEvn8cbSDBL";
var topics = [];// this an array
topics.push("birds");
topics.push("grass");
topics.push("dogs");
topics.push("cats");
topics.push("cloud");
topics.push("crying");
topics.push("hot");
topics.push("laugh");

$(document).ready(function () {
    "use strict";
    $("#txtsearchtext").val("");
    RunForLoopToAddButtons();
});

// This method calls the Giphy api and gets the data.
function GetFromGiphy(searchcriteria) {
    "use strict";
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + searchcriteria + "&api_key=" + APIKEY + "&limit=10");

    xhr.done(function (result) {

        ShowImages(result);

    });
}

function ShowImages(giphydata) {
    "use strict";

    var dataArray = giphydata.data;
    for (var i = 0; i < dataArray.length; i++) {

        var gpDiv = jQuery('<div/>', {
            id: 'div-id'+i,
            "class": 'gphyclass'
        });

        gpDiv.appendTo('#giphyImages');
    
        gpDiv.html("<center><div>Type: " + dataArray[i].type + " <br> Id: " + dataArray[i].id + " <br> Rating: " + dataArray[i].rating +  
        "</div> <img id='myImage' class='imgclass' title='myTitle' data-gif='" 
        + dataArray[i].images.fixed_height.url + "' src= " + dataArray[i].images.fixed_height_still.url + " ></center>");
         // you need to change only the .downsized.url

         $(".imgclass").on('click', function(event){
           
            event.stopPropagation();
            event.stopImmediatePropagation();
    
           var original = $(this).attr('src');
           var moving = $(this).attr('data-gif');
           $(this).prop('src', moving);
           $(this).attr('data-gif', original);

        }); 
    }
};

function RunForLoopToAddButtons() {
    "use strict";

    $("#myId").empty();
    for (var m = 0; m < topics.length; m++) {
    
        var mybutton = jQuery('<button/>', {
            id: 'some-id',
            "class": 'btnclass',
            title: 'now this div has a title!',
            text: topics[m],
        });
        
        // binding a click event for button.
        mybutton.click(function() {

            var searchThis = $(this).text();
            GetFromGiphy(searchThis);
        });

        mybutton.appendTo("#myId");
    }
}

function AddToArray(){
    "use strict";

    var text = $("#txtsearchtext").val();
    topics.push(text);
    RunForLoopToAddButtons();
    $("#txtsearchtext").val("");

}