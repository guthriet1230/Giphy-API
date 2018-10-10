var animals = ["cats", "pumpkins", "ghouls", "bats", "zombie"];

$(document).on("click", ".animals-btn", function() {
  var animal = $(this).attr("data-name");
  console.log(animal);
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    var results = response.data;

    $("#gifs-appear-here").empty();

    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div>");
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.original_still.url);
      animalImage.attr("data-animate", results[i].images.original.url);
      animalImage.attr("data-still", results[i].images.original_still.url);
      animalImage.attr("data-state", "still");
      animalDiv.append(p);
      animalDiv.append(animalImage);
      $("#gifs-appear-here").prepend(animalDiv);
      console.log(results[i]);
    }
  });
});

// gifs starting paused
$(document).on("click", "img", function() {
  var state = $(this).attr("data-state");
  console.log(state);

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

  // prepend to the HTML
});

// defining the array, rendering buttons, and adding buttons

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animals-btn");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var animalz = $("#animal-input")
    .val()
    .trim();
  animals.push(animalz);
  renderButtons();
});

renderButtons();
