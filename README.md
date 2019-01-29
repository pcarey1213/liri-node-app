# liri-node-app
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

1. LIRI searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

2. LIRI exists under a GitHub repository called liri-node-app with the following URL ("https://github.com/pcarey1213/liri-node-app").

3. LIRI sends requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs.

## How to Use LIRI

1. Make sure to initialize node.js and a package JSON file by navigating to the command line and running `npm init -y`

2. Add via npm install axios and Spotify

2. Add node modules, env, and .DS store to a .gitignore file

3. Acquire a spotify API key and secret and save to an .env file

4. Create a keys.js file with the following info 

```js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```
* Now you are ready to use LIRI!

1. From the keys.js file Liri will pull the spotify variable using 'require'.

2. LIRI can now take in one of the following commands, using process.argv through node:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

3. The four above commands will be stored under var command, and will run functions from a switch/case, while whatever follows goes under var item, and is used for queries and calls.

### What Each Command Does

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

Check it out! ("https://github.com/pcarey1213/liri-node-app/assets/images.step-1.png")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in the terminal/bash window using the Spotify API:

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then Liri will default to "The Sign" by Ace of Base.

Check it out again! ("https://github.com/pcarey1213/liri-node-app/assets/images.step-2.png")

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to the terminal/bash window using the OMDB API:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

Behold! ("https://github.com/pcarey1213/liri-node-app/assets/images.step-3.png")

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands, with the command coming first, followed by the input.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Feel free to edit the text in random.txt to test out the feature for movie-this and concert-this.
     
   * If the user doesn't type any command, the program will run a command from random.txt.

At last! ("https://github.com/pcarey1213/liri-node-app/assets/images.step-4.png")

**Thanks for using LIRI!**


















