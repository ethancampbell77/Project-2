$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $(".member-name").text(data.firstname);
  });

  function postsearch() {
    var keyword = $("searchbox").val().trim();
    event.preventDefault();
    var newSearch = {
      Search: keyword
    };

    // Question: What does this code do??
    $.post("/api/smalltalk/:keyword", newSearch)
      .then(function (data) {
        console.log("Keyword:", data);
      });
  }

  function newsAPI() {
    var keyword = $("#searchbox").val().trim()

    var queryURL = "https://newsapi.org/v2/everything?q=" + keyword + "&language=en&sortby=relevancy,popularity&apiKey=9faba65dc1fc4e59b71ebc898ca17b59";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .then(function (response) {

        var results = response.data

        for (var i = 0; i <= 5; i++) {
          var title = results[i].title;
          var description = results[i].description;


          ?
          ?
          .append(title); ?
          ?
          .append(description);
        }
      });
  }



  $("#subButton").on("click", function () {
    postsearch();
    newsAPI();
  });
});