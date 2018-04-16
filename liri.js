require("dotenv").config();

var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');

//var spotify = require('spotify');

const Twitter = require('twitter');
const TwitterUser = 'TrevorOgg';

// variable for user input
var input = process.argv[2];

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function showTweets() {

    var params = { screen_name: 'TrevorOgg' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                //console.log(response); // Show the full response in the terminal
                var twitterResults =
                    "@" + tweets[i].user.screen_name + ": " +
                    tweets[i].text + "\r\n" +
                    tweets[i].created_at + "\r\n" +
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                console.log(twitterResults);
            }
        } else {
            console.log("Error :" + error);
            return;
        }
    });
};

showTweets();




