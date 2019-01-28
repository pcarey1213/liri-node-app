require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs")

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var input = []

for (var i=2; i <process.argv.length; i++){

    input.push(process.argv[i]);
}

console.log(input);

var command = input[0];

console.log(command);

var item = ""

for (var j = 1; j < input.length; j++) {

    if (j > 1 && j < input.length) {
      item = item + "+" + input[j];
    }
    else {
      item += input[j];
  
    }
  };

console.log(item);

switch (command) {
case "concert-this":
    concertSearch();
    break;

case "spotify-this-song":
    spotifySong();
    break;

case "movie-this":
    movieSearch();
    break;

case "do-what-it-says":
    textCommand();
    break;
}

function concertSearch() {

    var artist=item;

    console.log(artist);

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(    
        function(response) {
        console.log(response.data);
    })
    .catch(function(err) {
        console.log(err);
    })
};

function spotifySong() {

    var song=item.trim().replace("+", " ")

    console.log(song)

    spotify.search({ type: 'track', query: song, limit:1 }, function(err, data) {
            
        if (err) {
            return console.log('Error occurred: ' + err);
        };

        console.log(data.tracks.items); 

    })
};

function movieSearch(){

    var movieName=item;

    if(item===""){
        movieName="mr+nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
    function(response) {
        console.log(response);
    //   * Title of the movie.
    console.log("Movie Title: " + response.data.Title);
    //   * Year the movie came out.
    console.log("Released in: " + response.data.Year);
    //   * IMDB Rating of the movie.
    console.log("IMDB Rating: " + response.data.imdbRating);
    //   * Rotten Tomatoes Rating of the movie.
    console.log("Rotten Tomatoes Rating:" + response.data.Ratings)
    //   * Country where the movie was produced.
    console.log("The movie was produced in: " + response.data.Country);
    //   * Language of the movie.
    console.log("The movie is in: " + response.data.Language);
    //   * Plot of the movie.
    console.log("Plot Summary: " + response.data.Plot);
    //   * Actors in the movie.
    console.log("Actors: " + response.data.Actors);
    }
    ).catch(function(err) {
        console.log(err);
    });
    };

function textCommand() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        input = data.trim().split(",");

        command=input[0];

        for (var j = 1; j < input.length; j++) {

            if (j > 1 && j < input.length) {
              item = item + "+" + input[j];
            }
            else {
              item += input[j];
            }
          };

        switch (command) {
            case "concert-this":
                concertSearch();
                break;
            
            case "spotify-this-song":
                spotifySong();
                break;
            
            case "movie-this":
                movieSearch();
                break;
            
            case "do-what-it-says":
                textCommand();
                break;
            }
      
      });
};