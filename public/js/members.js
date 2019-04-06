$(document).ready(function () {

  function newsAPI() {
    var keyword = $("#searchBox").val().trim();
    console.log(keyword);

    // After the data from the AJAX request comes back
    $.ajax({
      url: "/api/getArticles",
      method: "POST",
      body: {
        query: keyword
      }
    }).done(function (response) {
      console.log(response);
      // console.log(response.articles[0].title);
      // function that executes to display headlines on the page
      if (response.articles.length) {
        response.articles.forEach((articles, i) => {

          if (i < 5) {
            $("#quesDiv").append(`<p class="titleStyle">${articles.title}</p><p><b>Have you heard that:</b> ${articles.description} ?`);
          } else {
            return;
          }
        });
      }
    });
  }

  $("#submit").on("click", function (event) {
    // postsearch();
    newsAPI();
  });
});