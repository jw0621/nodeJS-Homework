require('dotenv').config();
var Twitter = require("twitter");
var twitterKeysFile = require("./keys.js");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// sets the first string after calling the .js file to trigger the action to be called
var action = process.argv[2];
var argument = ""
doTheThing(action, argument);
function doTheThing(action, argument) {
    argument = getThirdArgument();
    switch (action) {
        case "my-tweets":
        getDaTweets();
        break;

        case "spotify-this-song":
        var songTitle = argument;
        if (songtitle === "") {lookupSpecificSong()}
        else {
            spotifySong(songTitle);
        }
        break;

        case "movie-this":
        var movieTitle = argument;
        if (movieTitle ==="") {omdbLookUp ('Mr.Nobody')}
        else{
            omdbLookUp(movieTitle)
        };
        break;
    };

};

function getThirdArgument() {

	// Stores all possible arguments in array.
	argumentArray = process.argv;

	// Loops through words in node argument.
	for (var i = 3; i < argumentArray.length; i++) {
		argument += argumentArray[i];
	}
	return argument;
};

function getDaTweets() {
    var client = new Twitter(twitterKeysFile.twitterKeys);

	// Search parameters includes my tweets up to last 20 tweets;
	var params = {q: '@TomtheAzn', count: 20};

	// Shows the last 20 tweets and their timestamps in terminal.
	client.get('search/tweets', params, function(error, tweets, response) {
	  if (!error) {

	  	// Loops through tweets and prints out tweet text and creation date.
	  	for (var i = 0; i < tweets.statuses.length; i++) {
	  		var tweetText = tweets.statuses[i].text;
	  		logOutput("Tweet Text: " + tweetText);
	  		var tweetCreationDate = tweets.statuses[i].created_at;
	  		logOutput("Tweet Creation Date: " + tweetCreationDate);
	  	}
	  } else {
	  	logOutput(error);
	  };
	});
};

function spotifySong() {
    spotify.search({type: 'track', query: songTitle}, function(err, data) {
		if (err) {
			logOutput.error(err);
			return
		};

		var artistsArray = data.tracks.items[0].album.artists;

		// Array to hold artist names for songs with multiple credited artists.
		var artistsNames = [];

		// Pushes artists for track to array.
		for (var i = 0; i < artistsArray.length; i++) {
			artistsNames.push(artistsArray[i].name);
		};

		// Converts artists array to string, separates elements with proper punctuation.
		var artists = artistsNames.join(", ");

		// Prints the artist(s), track name, preview url, and album name.
		logOutput("Artist(s): " + artists);
		logOutput("Song: " + data.tracks.items[0].name)
		logOutput("Spotify Preview URL: " + data.tracks.items[0].preview_url)
		logOutput("Album Name: " + data.tracks.items[0].album.name);
	});
	
};

function lookupSpecificSong() {

	// Calls Spotify API to retrieve a specific track, Plug-in Baby, Muse.
	spotify.lookup({type: 'track', id: '429MqIq5nGH32feyRZHunv'}, function(err, data) {
		if (err) {
			logOutput.error(err);
			return
		}

		// Prints the artist, track name, preview url, and album name.
		logOutput("Artist: " + data.artists[0].name);
		logOutput("Song: " + data.name);
		logOutput("Spotify Preview URL: " + data.preview_url);
		logOutput("Album Name: " + data.album.name);
	});
};

function doWhatItSays() {

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// Splits text into separate components at comma.
			var randomArray = data.split(",");

			// Sets action to the first item in array.
			action = randomArray[0];

			// Sets optional third argument to the second item in array.
			argument = randomArray[1];

			// Calls main controller to do something based on action and argument.
			doSomething(action, argument);
		};
	});
}