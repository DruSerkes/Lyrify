const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const ExpressError = require('./helpers/ExpressError');
const User = require('./models/user');
const SpotifyWebApi = require('spotify-web-api-node');
const { clientId, clientSecret, redirectUri, scopes, HOME, SECRET_KEY } = require('./config');
const { extractSongData, getLyrics } = require('./helpers/helpers');

const spotifyApi = new SpotifyWebApi({ redirectUri, clientId, clientSecret });

const app = express();

// Parse JSON
app.use(express.json());

// CORS
app.use(cors());

// Cookies
app.use(cookieParser(SECRET_KEY));

// Some security
app.use(helmet());

// Request logger
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
	return res.redirect(HOME);
});

app.get('/users/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.getById(id);
		spotifyApi.setAccessToken(user.access_token);
		spotifyApi.setRefreshToken(user.refresh_token);
		delete user.refresh_token;
		return res.json({ user });
	} catch (e) {
		return next(e);
	}
});

app.get('/now-playing', async (req, res, next) => {
	try {
		const data = await spotifyApi.getMyCurrentPlayingTrack();
		console.log(data);
		if (data.body.currently_playing_type !== 'track') {
			const message = 'No song currently playing';
			return res.json({ message });
		}
		const songData = extractSongData(data.body);
		songData.lyrics = await getLyrics(songData);
		// TODO - DB stuff
		// for now just return the song data
		return res.json({ songData });
	} catch (e) {
		console.log(e);
		return next(e);
	}
});

// TODO
app.get('/search', async (req, res, next) => {
	try {
		const { song: track, artist } = req.body;
		const response = await spotifyApi.searchTracks(`track:${track} artist:${artist}`);
		// Start here tomorrow
		console.log(response);
		// extract the data you need
		// get the lyrics
		// send it all back to the client
		// handle edge cases & errors
	} catch (e) {
		return next(e);
	}
});

app.get('/spotify/auth', (req, res, next) => {
	try {
		const authUrl = spotifyApi.createAuthorizeURL(scopes);
		console.log('authorize url == ', authUrl);
		res.redirect(authUrl + '&show_dialogue=true');
	} catch (e) {
		console.log(e);
		return next(e);
	}
});

app.get('/callback', async (req, res, next) => {
	try {
		const { code } = req.query;
		const authData = await spotifyApi.authorizationCodeGrant(code);
		const { access_token, refresh_token } = authData.body;
		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);

		// Get user data from Spotify
		const me = await spotifyApi.getMe();
		const { id, display_name, email, href, product } = me.body;
		const img_url = me.body.images[0].url;
		// Check if user already in DB
		const dbUser = await User.getById(id);
		if (dbUser) {
			delete dbUser.refresh_token;
			return res.redirect(`${HOME}?${querystring.stringify(dbUser)}`);
		} else {
			const userData = { id, display_name, email, href, product, img_url, access_token, refresh_token };
			const newUser = await User.create(userData);
			delete newUser.refresh_token;
			return res.redirect(`${HOME}?${querystring.stringify(newUser)}`);
		}
	} catch (e) {
		console.log('something went wrong', e.message);
		return next(e);
	}
});

/*
* 
*/

/** 404 handler */

app.use((req, res, next) => {
	const err = new ExpressError('Not Found', 404);

	// pass the error to the next piece of middleware
	return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	console.error(err.stack);

	return res.json({
		status  : err.status,
		message : err.message
	});
});

module.exports = app;
