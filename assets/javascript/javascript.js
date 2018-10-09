var animals = ["cats", "dogs"]

$("button").on("click", function() {
  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response)
      var results = response.data; 

      for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div>");
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);
      animalDiv.append(p);
      animalDiv.append(animalImage);

      $("#gifs-appear-here").prepend(animalDiv);
      }
  });
})


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
  var animall = $("#animal-input").val().trim();
  animals.push(animall);
  renderButtons();
}); 

renderButtons()
