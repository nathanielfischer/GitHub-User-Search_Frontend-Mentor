// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();



// Button "Event Listener"

$("#button-addon2").click(function() {
  var username = $(".form-control")[0].value;

  if (username === "") {
    username = "octocat";
  }

  callAPI(username);
});



// API GET request

function callAPI(username) {
  // Open a new connection, using the GET request on the URL endpoint
  request.open("GET", "https://api.github.com/users/" + username, true);

  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    updateWebsite(data);
  }

  // Send request
  request.send()
}



// Data to HTML5

function updateWebsite(json) {
  console.log(json);
  console.log("Avatar: " + json.avatar_url);
}
