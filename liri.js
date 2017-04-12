/* 
Make it so liri.js can take in one of the following commands:
my-tweets
spotify-this-song
movie-this
do-what-it-says
*/

// Write up code that calls up the keys.js to grab hidden keys
var keys = require("./keys.js");
var twitter = require('twitter'); // node twitter package
var spotify = require('spotify'); // node spotify package
var request = require('request'); // call OMDB website
var fs = require('fs'); // read random.txt file
var params = process.argv.slice(2);

// switch case
switch (params[0]) {
    case "my-tweets":
        tweets(); 
        break;
    case "spotify-this-song":
        if (params[1]) {
            spotifyIt();
        } else {
            spotifyIt(params[1] = "The Sign");
        }
        break;
    case "movie-this":
        if (params[1]) {
            findMovie();
        } else {
            findMovie(params[1] = "Mr. Nobody");
        }
        break;
    case "do-what-it-says":
        readFillCall(params[1]);
        break;

} // end of switch 

// tweets function https://www.npmjs.com/package/twitter
function tweets() {
	var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
// make GET requests against the API via the convenience methods.
    client.get('statuses/user_timeline', { screen_name: 'chrislstuckey', count: 20 }, function(error, data, response) {
        if (error) throw error;
        for (var i = 0; i < data.length; i++) {

            var tweetResults = data[i].text + "\n";
            console.log(" " + " " + "My last 20 Tweets" + " " + " ")
              console.log("------------------------------"); 
                console.log(tweetResults);
        };
    });
}

// spotify function https://www.npmjs.com/package/spotify
function spotifyIt() {
    spotify.search({ type: 'track', query: params[1] }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return; 
        } else {
            var songInfo = data.tracks.items[0];
            console.log(" " + " " + "Spotify Results" + " " + " ")
              console.log("--------------------------");
            console.log("artist name", songInfo.artists[0].name);
            console.log("song name", songInfo.name);
            console.log("album name", songInfo.album.name);
            console.log("preview link", songInfo.preview_url);

        };
    });
}
spotifyIt();

// movie function http://www.omdbapi.com/
function findMovie() {
  request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json", function(error, response, body){
    var movieObject = JSON.parse(body);
    console.log(" " + " " + "Movie Results" + " " + " ")
        console.log("------------------------------------------");
    console.log("the title is", movieObject.Title);
    console.log("the year is", movieObject.Year);
    console.log("the IMDB Rating is", movieObject.imdbRating);
    console.log("the country is", movieObject.Country);
    console.log("the language is", movieObject.Language);
    console.log("the plot is", movieObject.Plot);
    console.log("the actors are", movieObject.Actors);
  });
};


function readFillCall() {
  fs.readFile("random.txt", "utf-8", function(err, data){
    data.split(',');
    spotifyIt(data[1]);
  });
};
