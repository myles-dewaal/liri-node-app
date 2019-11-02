require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


function concertThis() {
    var searCritiria = process.argv[3];
    axios.get('https://rest.bandsintown.com/artists/' + searCritiria + '/events?app_id=codingbootcamp')
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(JSON.stringify(response.data[i].datetime, null, 2));
                console.log(JSON.stringify(response.data[i].venue, null, 2));
            }
            // handle success
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}
concertThis();

function spotifyThis() {
    spotify.search({ type: 'track', query: process.argv[3], limit: 1 })
        .then(function (response) {
            console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
            console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));
            console.log(JSON.stringify(response.tracks.items[0].name, null, 2));


            // console.log(response)
        })
        .catch(function (err) {
            console.log(err);
        })
}
spotifyThis();

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=Spaceballs&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
          console.log(response.data.Title);
          console.log(response.data.Year);
          console.log(response.data.Rated);
          console.log(response.data.Metascore);
          console.log(response.data.Country);
          console.log(response.data.Language);
          console.log(response.data.Plot);
          console.log(response.data.Actors);

        })
        .catch(function(error) {
          if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
    movieThis();
