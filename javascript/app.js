// top of page bands array
var bandArray = ["Panic! At The Disco", "Fall Out Boy", "The Killers", "Red Hot Chili Peppers", "Sublime"];

// ajax adding buttons
$(document).ready(function() {
    for (var i = 0; i < bandArray.length; i++) {
        $("#musicButtons").append("<button type='button' onclick='searchGif(\"" + bandArray[i] + "\")' class='btn btn-primary' value=' " + bandArray[i] + "'> " + bandArray[i] + " </button>");
    }
});

// when user enters band name and clicks
function bandButtonClicked() {
    var userInput = $('#bandInput').val();
    searchGif(userInput);
}

// when submit button is clicked
function submitButtonClicked() {
    var userInput = $('#bandInput').val();

    if (userInput) {
        $('#musicButtons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

// how to populate gifs using giphy api
function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=AgrIByrXSgjJHLpCrjfzMr4XPfJCF2fU',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

// displays the gifs from giphy api
function displayGif(response) {
    $('#bands').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#bands').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}