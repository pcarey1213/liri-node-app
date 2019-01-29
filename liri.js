require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var input = []

var divider = "\n------------------------------------------------------------\n\n";

for (var i=2; i <process.argv.length; i++) {

    input.push(process.argv[i]);
};

var command = input[0];

var item = ""

for (var j = 1; j < input.length; j++) {

    if (j > 1 && j < input.length) {
      item = item + "+" + input[j];
    }
    else {
      item += input[j];
  
    }
  };

if (!command) {
    command = "do-what-it-says";
  }

// Switch/case decides which function to run 

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

    axios.get(queryUrl).then(function(response) {
        //hold objects under variable jsonData
        var jsonData = response.data;

        var showData= [];
        for (var i=0; i < jsonData.length; i ++){
        //* Name of the venue
        showData.push("Name of Venue: " + jsonData[i].venue.name)
        //* Venue location
        showData.push("Location: " + jsonData[i].venue.city + "," + jsonData[i].venue.region + "," + jsonData[i].venue.country); 
        //* Date of Event
        showData.push("Date: " + jsonData[i].datetime); 

        showData.join("\n\n");

        showData+divider

        fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
        });
    };

        console.log(showData)
    
    })
    .catch(function(err) {
        console.log(err);
    })
      
};

function spotifySong() {

    // Replace item + signs with spaces
    var song=item.trim().replace("+", " ")
    //  * If no song is provided then program will default to "The Sign" by Ace of Base.
    if(item === ""){
        song="The Sign Ace of Base"
    }
    //Spotify API call
    spotify.search({ type: 'track', query: song, limit:1 }, function(err, data) {

        //Error
        if (err) {
            return console.log('Error occurred: ' + err);
          };
        //Hold objects under variable songData
        var songData = data.tracks.items[0];

        var artists=[]

        for (var i=0; i < songData.artists.length; i++) {

        artists.push(songData.artists[i].name);

        }

        // * Artist(s)
        console.log("Artist(s): " + artists)
        // * The song's name
        console.log("Song Name: " + songData.name); 
        // * A preview link of the song from Spotify
        console.log("Url: " + songData.external_urls.spotify); 
        // * The album that the song is from
        console.log("Album Name: " + songData.album.name); 


    })
};

function movieSearch(){

    var movieName=item;

    if(item === ""){
        movieName="mr+nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
        var jsonData = response.data;
        //   * Title of the movie.
        console.log("Movie Title: " + jsonData.Title);
        //   * Year the movie came out.
        console.log("Released in: " + jsonData.Year);
        //   * IMDB Rating of the movie.
        console.log("IMDB Rating: " + jsonData.imdbRating);
        //   * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        //   * Country where the movie was produced.
        console.log("The movie was produced in: " + jsonData.Country);
        //   * Language of the movie.
        console.log("The movie is in: " + jsonData.Language);
        //   * Plot of the movie.
        console.log("Plot Summary: " + jsonData.Plot);
        //   * Actors in the movie.
        console.log("Actors: " + jsonData.Actors);
        }
    ).catch(function(err) {
        console.log(err);
    });
    };

function textCommand() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        //Error if failed to read
        if (error) {
          return console.log(error);
        }
        //New input from Random
        input = data.trim().split(",");
        //New command from Random
        command = input[0];

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