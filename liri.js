require("dotenv").config();

var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var inquirer = require("inquirer");

var Spotify = require('node-spotify-api');

const Twitter = require('twitter');
const TwitterUser = 'TrevorOgg';

var input = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function liri() {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Show tweets',
                'Find a song',
                'Find a movie',
                'Do what it says'
            ]
        })
        .then(function (answer) {
            switch(answer.action){
                case 'Show tweets':
                showTweets();
                break;

                case 'Find a song':
                findSong();
                break;
            }

        });
};

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

function findSong(songName) {

    inquirer
        .prompt({
            name: 'action',
            type: 'input',
            message: 'What song?',
        })
        .then(function (answer) {

            if (!songName) {
                songName = "The Sign";
            }
            params = answer;
            spotify.search({ type: "track", query: params }, function (err, data) {
                if (!err) {
                    var songInfo = data.tracks.items;
                    for (var i = 0; i < 5; i++) {
                        if (songInfo[i] != undefined) {
                            var spotifyResults =
                                "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                                "Song: " + songInfo[i].name + "\r\n" +
                                "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                                "Preview Url: " + songInfo[i].preview_url + "\r\n" +
                                "------------------------------ " + i + " ------------------------------" + "\r\n";
                            console.log(spotifyResults);
                        }
                    }
                } else {
                    console.log("Error :" + err);
                    return;
                }
            });
        });
};

liri();