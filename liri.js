//OMDb API key 1249ab7c
// class OMDB 40e9cece

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys').client;
const request = require('request');
const fs = require('fs');

let command = process.argv[2];
let item = process.argv[3];

let twitter = () => {
  let params = { screen_name: '@SuperEpicWiz' };
  keys.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length && i < 21; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text + '\n');
      }
    } else {
      console.log(error);
    }
  });

};

let spotify = () => {
  let spotify = new Spotify({
    id: '<your spotify client id>', //unable to get
    secret: '<your spotify client secret>' //unable to get
  });
  if (item === undefined) { item = 'The Sign'; }
  spotify.search({ type: 'track', query: item }, function(err, data) {
    if (!err) {
      console.log(data);
      //I assume it would look something like the following possible with needed
      //JSON.parse
      console.log(data.Artist);
      console.log(data.Name);
      console.log(data.Link);
      console.log(data.Album);

    }
  });

};

let omdb = () => {
  let title = item;
  if (process.argv.length > 4) {
    for (let i = 4; i < process.argv.length; i++) {
      title += ('+' + process.argv[i])
    }
  }
  request('http://www.omdbapi.com/?apikey=40e9cece&t=' + title + '&type=movie', function(error, response, body) {
    if (!error) {
              if (JSON.parse(body).Title) {
                console.log('Title: ' + JSON.parse(body).Title);
              }
              if (JSON.parse(body).Released) {
                console.log('Released: ' + JSON.parse(body).Released);
              }
              if (JSON.parse(body).Ratings && JSON.parse(body).Ratings.length > 1) {
                console.log('Rotten Tomatoes: ' + JSON.parse(body).Ratings[1].Value);
              }
              if (JSON.parse(body).Country) {
                console.log('Country: ' + JSON.parse(body).Country);
              }
              if (JSON.parse(body).Language) {
                console.log('Language: ' + JSON.parse(body).Language);
              }
              if (JSON.parse(body).Plot) {
                console.log('Plot: ' + JSON.parse(body).Plot);
              }
              if (JSON.parse(body).Actors) {
                console.log('Actors: ' + JSON.parse(body).Actors);
              }
              console.log('\n');


    } else {
      console.log(error);
    }
  });

};

let spotify_from_file = () => {
  let song = '';
  let callIt = () => {

    let spotify = new Spotify({
      id: '<your spotify client id>', //unable to get
      secret: '<your spotify client secret>' //unable to get
    });
    spotify.search({ type: 'track', query: song }, function(err, data) {
      if (!err) {
        console.log(data);
        //I assume it would look something like the following possible with needed
        //JSON.parse
        console.log(data.Artist);
        console.log(data.Name);
        console.log(data.Link);
        console.log(data.Album);
      }
    });

  };



  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (!error) {
      let x = data.split(',');
      song = x[1];
      callIt();
    }
  });

};

switch (command) {
  case 'my-tweets':
    twitter();
    break;
  case 'spotify-this-song':
    spotify();
    break;
  case 'movie-this':
    omdb();
    break;
  case 'do-what-it-says':
    spotify_from_file();
    break;
  default:
    console.log('Command input error.');
}
