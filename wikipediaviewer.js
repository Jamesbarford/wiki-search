//makes the search immediately typeable
window.onload = function() {
 document.getElementById("searchquery").focus();
};

//grabs the API and sets what to get and do with it
function fetch(query) {
  return $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json',
    data: {action: 'query', list: 'search', srsearch: query, format: 'json'},
    dataType: 'jsonp',
  });
}

//this is the otput of the results
function render(results) {
  var $out = $("out");
  var html = results.map(function(result) {
    return '<a class="result"' +
           '   href="https://en.wikipedia.org/wiki/'+result.title+'">' +
           '  <h2>'+result.title+'</h2>' +
           '  <div>'+result.snippet+'</div>' +
           '</a>';
  }).join("");
  $out.html(" ");
  $(html).appendTo($out);
}

//When the submit button is hit it will grab the data
$("#searchform").on("submit", function(event) {
  event.preventDefault();
  var query = $("#searchquery").val();
  fetch(query)
    .done(function(data) {
      console.log(data);
      render(data.query.search);
    });
});
