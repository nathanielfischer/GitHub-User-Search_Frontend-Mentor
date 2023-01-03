// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();



// "Event Listener" start

$("#button-addon2").click(function() {
  checkUsername();
});

$(".toggle").click(function() {
  toggleMode();
});


$('.form-control').keypress(function (e) {
  if (e.which == 13) {
    checkUsername();
  }
});


// "Event Listener" end




function checkUsername() {
  var username = $(".form-control")[0].value;
  if (username === "") {
    username = "octocat";
  }
  callAPI(username);
}


// API GET request
function callAPI(username) {
  // Open a new connection, using the GET request on the URL endpoint
  request.open("GET", "https://api.github.com/users/" + username, true);

  // Send request
  request.send()

  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    //check for error
    if (request.status >= 200 && request.status < 400) {
      updateWebsite(data);
    } else {
      console.log("error");
      $(".error").show();
    }
  }
}



// Data to HTML

function updateWebsite(json) {
  $(".error").hide(); // hide error message

  $(".user-image").attr("src", json.avatar_url);
  $("#name").text(json.name);
  $("#username").text("@" + json.login);
  const date = new Date(json.created_at);
  $(".joined-date").text("Joined " + date.toUTCString().substring(5, 17));
  $(".description-mobile").text(json.bio);
  $(".description-desktop").text(json.bio);

  //stats
  $(".stats h2").eq(0).text(json.public_repos);
  $(".stats h2").eq(1).text(json.followers);
  $(".stats h2").eq(2).text(json.following);

  //location
  if (json.location === null) {
    $(".data-point").eq(0).addClass("not-available");
    $(".data-point a").eq(0).text("not available");
  } else {
    $(".data-point").eq(0).removeClass("not-available");
    $(".data-point a").eq(0).text(json.location);
  }

  //twitter
  if (json.twitter_username === null) {
    $(".data-point").eq(1).addClass("not-available");
    $(".data-point a").eq(1).text("not available");
  } else {
    $(".data-point").eq(1).removeClass("not-available");
    $(".data-point a").eq(1).text(json.twitter_username);
  }

  //blog
  if (json.blog === "") {
    $(".data-point").eq(2).addClass("not-available");
    $(".data-point a").eq(2).text("not available");
    $(".data-point a").eq(2).removeAttr("href");
  } else {
    $(".data-point").eq(2).removeClass("not-available");
    var blogURL = json.blog;
    $(".data-point a").eq(2).text(blogURL.substring(8, blogURL.length));
    $(".data-point a").eq(2).removeAttr("href");
    $(".data-point a").eq(2).attr("href", json.blog);
  }

  //company
  if (json.company === null) {
    $(".data-point").eq(3).addClass("not-available");
    $(".data-point a").eq(3).text("not available");
  } else {
    $(".data-point").eq(3).removeClass("not-available");
    $(".data-point a").eq(3).text(json.company);
  }

}



// toggle light / dark mode
function toggleMode(){
  //change toggle text and icon
  $(".toggle-dark").toggle();
  $(".toggle-light").toggle();


  $("h1").toggleClass("h-light");
  $("h2").toggleClass("h-light");
  $("body").toggleClass("background-light");
  $(".stats").toggleClass("background-light");
  $(".container").toggleClass("container-light");
  $(".joined-date").toggleClass("joined-date-light");
  $(".icon-small").toggleClass("icon-small-light");

  $(".input-group").toggleClass("form-control-light");
  $(".form-control").toggleClass("form-control-light");
  $(".input-group-text").toggleClass("form-control-light");
}
