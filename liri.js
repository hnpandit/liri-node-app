require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var axios = require("axios");

var spotify = new Spotify(keys.spotify);

// Get Variables
var argOne = process.argv[2];
var argTwo = process.argv[3];

if (argOne == "concert-this")
{
   concert(argTwo);
} 
else
if (argOne == "movie-this")
{
  if (process.argv.length == 3)
    movie("Mr. Nobody");
  else  
    movie(argTwo);
} 
else
if (argOne == "spotify-this-song")
{
  if (process.argv.length == 3)
    spotifysong("The Sign");
  else  
    spotifysong(argTwo);
} 

function spotifysong(songname)
{
  //spotify.search({ type: 'track', query: songname }, function(err, data) 
  //{
  //  if (err) 
  //  {
  //      return console.log('Error occurred: ' + err);
  //  }
  //  console.log(JSON.stringify(data, null, 2)); 
  //});
  // We then run the request with axios module on a URL with a JSON

  //https://api.spotify.com/v1/search?q=album%3Aarrival%20artist%3Aabba&type=album" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "

  let queryURL = "https://api.spotify.com/v1/search?q='" + songname + "'&type=track&limit=1";
  console.log("Query" + queryURL);
  spotify
  .request(queryURL)
  .then(function(data) {
    console.log(JSON.stringify(data, null, 2)); 
    for (i=0; i<data.tracks.items.length; i++)
    {
       console.log("----------");
       console.log(data.tracks.items[i].album.name);
       console.log(data.tracks.items[i].name);
       console.log(data.tracks.items[i].href);
       for (j=0; j<data.tracks.items[i].artists.length; j++)
         console.log(data.tracks.items[i].artists[j].name);
    }
    //console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

}


function concert(artist)
{
  // We then run the request with axios module on a URL with a JSON
  let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  axios.get(queryURL).then(
    function(response) {
      // Then we print out the imdbRating
    
      console.log("Please find events for your artist below: ");
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