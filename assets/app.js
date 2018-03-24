 
 
 
 var topics = ["Ironman", "Green Lantern", "Batman", "The Hulk", "Captain America", "Superman", "Thor", "Antman", "Spiderman", "Flash", "Wonder Women", "Doctor Strange", "Black Widow"];



 $("#buttons-view").empty();

 function renderButtons() {
     var heroButton = $("<button class='btn btn-md hero'>");
     var inside = $("#hero-input").val().trim();

     heroButton.attr("data-name", inside);
     heroButton.text(inside);
     $("#buttons-view").append(heroButton);
     topics.push(inside);
     $("hero-input").val("");
     console.log(heroButton);
 };

 $("#add-hero").on("click", function (event) {
     event.preventDefault();
     renderButtons();
     
     
		});



 for (var i = 0; i < topics.length; i++) {
     var a = $("<button class='btn btn-md hero'>");
     a.attr("data-name", topics[i]);
     a.text(topics[i]);
     $("#buttons-view").append(a);
 }

 $(".hero").on("click", function () {
     var topic = $(this).attr("data-name");
     var queryURL =
         "https://api.giphy.com/v1/gifs/search?q=" +
         topic +
         "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
     $.ajax({
         url: queryURL,
         method: "GET"
     }).done(function (response) {
         var results = response.data;
         for (var i = 0; i < results.length; i++) {
             var gifDiv = $("#hero");
             var gifHold = $("<div class='inline'>");
             var gif = $("<img class ='gifAnimations'>");
             gif.attr("data-state", "still");
             gif.attr("src", results[i].images.fixed_height_still.url);
             gif.attr("data-still", results[i].images.fixed_height_still.url);
             gif.attr("data-animate", results[i].images.fixed_height.url);
             var p = $("<p>");
             p.text("Rating: " + results[i].rating);

             gifHold.append(p);
             gifHold.prepend(gif);
             $("#hero").prepend(gifHold);
         }
         $(".gifAnimations").on("click", function () {
             var state = $(this).attr("data-state");
             console.log(state);

             if (state === "still") {
                 $(this).attr("src", $(this).attr("data-animate"));
                 $(this).attr("data-state", "animate");
                 console.log($(this).attr("data-state"));
             } else if (state === "animate") {
                 $(this).attr("src", $(this).attr("data-still"));
                 $(this).attr("data-state", "still");

                 console.log($(this).attr("data-state"));
             }
         });
     });
 });