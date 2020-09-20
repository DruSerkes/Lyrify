# Lyrify

##### Link to deployed site
[Lyrify](https://lyrify.netlify.app/)

__A web app for getting the lyrics to the songs you love__  

Users must login with their [Spotify Account](https://spotify.com). 

Once logged in, users can get the lyrics to whatever song they're currently listening to on Spotify. There is also an option to search for lyrics by artist and song title. 

Users can save currently-playing lyrics to their favorites, where they can revisit and remove them. 


## Features

This web app makes use of some helper functionality on the backend to clean up song title input - removing words commonly added to song titles - if the first try at getting lyrics is unsuccessful.


## Data 
Data for this app is sourced from
* [The Spotify API](https://developer.spotify.com/documentation)
* [Lyrics OVH](https://lyricsovh.docs.apiary.io/)


## Tech:

* Server built in __Node.js__ with __Express__

* UI built with __React__ using __Material UI__ components

* Client-side routing handled by __React Router__

* Database: __PostgreSQL__ 

* Backend deployed for free on __Heroku__

* Frontend deployed for free on __Netlify__  


## Tests:

1. Clone this repo
2. cd into the client directory
3. ```npm install```
4. Run tests with ```npm test```
5. cd back and into the server directory 
6. ```npm install``` again 
7. Test the backend with ```npm test``` - tests involving the [remove-words](https://github.com/Lissy93/remove-words) package will fail unless you add ```.main``` to require statement


## Devs: 

Certain lines of code are commented out for production vs development - I've added comments in components where you can make changes if you want to work on this project. 

--- 

###### *Your first page load or login may be a bit slow if noone has visited the app in some time, but it's free, so we can't complain!*
###### *This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*
