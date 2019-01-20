require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

// Get Variables
//var argOne = process.argv[2];
//var argTwo = process.argv[3];

//spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) 
//{
//    if (err) {
//      return console.log('Error occurred: ' + err);
////    }
//   
//  console.log(JSON.stringify(data, null, 2)); 
//});
  
// We then run the request with axios module on a URL with a JSON
let queryURL = "https://rest.bandsintown.com/artists/" + "Ryan Roman" + "/events?app_id=codingbootcamp"
axios.get(queryURL).then(
  function(response) {
    // Then we print out the imdbRating
    
    for (i=0; i<response.data.length; i++)
    {
      console.log(response.data[i].venue.name + " " + response.data[i].venue.city + " " + response.data[i].datetime); 
    }
  }
);

// We then run the request with axios module on a URL with a JSON
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log("The movie's title is: " + response.data.Title);
    console.log("The movie's title is: " + response.data.Language);
    console.log("The movie's rating is: " + response.data.imdbRating);
    console.log("The movie's rating is: " + response.data.Actors);
    console.log("The movie's rating is: " + response.data.Plot);
  }
);