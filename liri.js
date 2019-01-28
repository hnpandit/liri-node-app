require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

// Get Variables
var argOne = process.argv[2];
var argTwo = process.argv[3];

if (argOne === "concert-this")
{
   concert(argTwo);
} 
else
if (argOne === "movie-this")
{
  if (process.argv.length === 3)
    movie("Mr. Nobody");
  else  
    movie(argTwo);
} 
else
if (argOne === "spotify-this-song")
{
  if (process.argv.length === 3)
    spotifysong("The Sign");
  else  
    spotifysong(argTwo);
} 
else
if (argOne === "do-what-it-says")
{
  dowhatitsays();
} 
else
{
  console.log("Please review your input and reenter using following guide.");
  console.log("node liri.js concert-this <artist/band name here>");
  console.log("node liri.js spotify-this-song '<song name here>'");
  console.log("node liri.js movie-this '<movie name here>'");
  console.log("node liri.js do-what-it-says");
} 

function concert(artist)
{
  // We then run the request with axios module on a URL with a JSON
  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  axios.get(queryURL).then(
    function(response) {
      console.log("Please find events for your artist/band below: ");
      for (i=0; i<response.data.length; i++)
      { 
        console.log("Event " + (i+1));
        console.log("Name of the venue: " + response.data[i].venue.name);
        console.log("Venue location   : " + response.data[i].venue.city );
        console.log("Date of the Event: " + response.data[i].datetime);
      }
    }
);
}

function spotifysong(songname)
{
  spotify
  .search({ type: 'track', query: songname })
  .then(function(data) {
    //console.log(JSON.stringify(data, null, 2)); 
    console.log("Please find details for your song below: ");
    for (i=0; i<data.tracks.items.length; i++)
    {
       console.log("Album        : " + data.tracks.items[i].album.name);
       console.log("Name         : " + data.tracks.items[i].name);
       console.log("Spotify URL  : " + data.tracks.items[i].href);
       console.log("Artists      : ");
       for (j=0; j<data.tracks.items[i].artists.length; j++)
         console.log(data.tracks.items[i].artists[j].name);
    }
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

}

function movie(moviename)
{ 
  console.log("Please find details for your movie: " + moviename);
  // We then run the request with axios module on a URL with a JSON
  let queryURL = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=trilogy";
  axios.get(queryURL).then(
    function(response) {
      // Then we print out the imdbRating
      console.log("Title       : " + response.data.Title);
      console.log("Year        : " + response.data.Year);
      console.log("Country     : " + response.data.Country);
      console.log("Language    : " + response.data.Language);
      console.log("IMDB Rating : " + response.data.imdbRating);
      console.log("RTs Rating  : " + response.data.Ratings[1].Value);
      console.log("Actors      : " + response.data.Actors);
      console.log("Plot        : " + response.data.Plot);
    }
  );
}

function dowhatitsays()
{
    fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    var command = dataArr[0];
    var parameter = dataArr[1];

    console.log("command   :" + command);
    console.log("parameter :" + parameter);

    if (command === "concert-this")
    {
        concert(parameter);
    } 
    else
    if (command === "movie-this")
    {
      if (process.argv.length === 6)
        movie("Mr. Nobody");
      else  
        movie(parameter);
    } 
    else
    if (command === "spotify-this-song")
    {
      if (process.argv.length === 3)
        spotifysong("The Sign");
      else  
        spotifysong(parameter);
    } 
    });
}