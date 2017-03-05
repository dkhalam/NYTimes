// $("#article").on("click", function() {
// 	console.log("New York Times Article")

	// Include NYT API

	// use AJAX to find and apply the URL

	// include the auth key
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	// ensure business logic is outside of content

var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

	// constructing a URL to search for articles
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
	 authKey + "&q=california&limit=10";

// have a basepoint of starting the article count 
var articleCounter = 0;

// run a function to keep count of articles and download data from the API url 
function runQuery(numArticles, queryURL) {

// get data associated with URL
		$.ajax({
		          url: queryURL,
		          method: "GET"
		}).done(function(NYTData) {
			console.log("URL: " + queryURL);
			console.log("--------");
			console.log(NYTData);
			console.log("--------");

// loop through number of articles that we want to return
			for (var i = 0; i < numArticles; i++) {
				articleCounter++;
				// show the article content that is returned within the HTML
				var wellSection = $("<div>");
				wellSection.addClass("well");
				wellSection.attr("id", "article-well-" + articleCounter);
				$("#well-section").append(wellSection);

				// include article headline in the html
				if (NYTData.response.docs[i].headline !== "null") {
					$("#article-well-" + articleCounter)
          				.append(
				            "<h3 class='articleHeadline'><span class='label label-primary'>" +
				            articleCounter + "</span><strong> " +
				            NYTData.response.docs[i].headline.main + "</strong></h3>"
          				);

          			console.log(NYTData.response.docs[i].headline.main);
				}

				// include article byline if there is one
				if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        			$("#article-well-" + articleCounter)
          				.append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
			        // Log the first article's Author to console.
			        console.log(NYTData.response.docs[i].byline.original);
      			}

      			// Provide additional article info like section name, date, URL
      			$("#articleWell-" + articleCounter)
        			.append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
			    $("#articleWell-" + articleCounter)
			        .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
			    $("#articleWell-" + articleCounter)
			        .append(
			          "<a href='" + NYTData.response.docs[i].web_url + "'>" +
			          NYTData.response.docs[i].web_url + "</a>"
			        );

			    console.log(NYTData.response.docs[i].pub_date);
			    console.log(NYTData.response.docs[i].section_name);
			    console.log(NYTData.response.docs[i].web_url);
			}
		});

}

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks).
  event.preventDefault();
  // Initially sets the articleCounter to 0
  articleCounter = 0;
  // Empties the region associated with the articles
  $("#well-section").empty();
  // Grabbing text the user typed into the search input
  searchTerm = $("#search-term").val().trim();
  var queryURL = queryURLBase + searchTerm;
  // Number of results the user would like displayed
  numResults = $("#num-records-select").val();
  // Start Year
  startYear = $("#start-year").val().trim();
  // End Year
  endYear = $("#end-year").val().trim();
  // If the user provides a startYear -- the startYear will be included in the queryURL
  if (parseInt(startYear)) {
    queryURL = queryURL + "&begin_date=" + startYear + "0101";
  }
  // If the user provides a startYear -- the endYear will be included in the queryURL
  if (parseInt(endYear)) {
    queryURL = queryURL + "&end_date=" + endYear + "0101";
  }
  // Then we will pass the final queryURL and the number of results to
  // include to the runQuery function
  runQuery(numResults, queryURL);
});
// This button clears the top articles section
$("#clear-all").on("click", function() {
  articleCounter = 0;
  $("#well-section").empty();
});