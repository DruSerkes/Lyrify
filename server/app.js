const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const querystring = require('querystring');
const jsonschema = require('jsonschema');
const { v4: uuidv4 } = require('uuid');
const ExpressError = require('./helpers/ExpressError');
const User = require('./models/user');
const Song = require('./models/song');
const SpotifyWebApi = require('spotify-web-api-node');
const { clientId, clientSecret, redirectUri, scopes, HOME, state } = require('./config');
const { fetchLyrics, getImgUrl } = require('./helpers/helpers');
const searchSongSchema = require('./schemas/searchSchema.json');
const userRoutes = require('./routes/users');

const app = express();

// Parse JSON
app.use(express.json());

// CORS
app.use(cors());

// Some security
app.use(helmet());

// Request logger
app.use(morgan('dev'));

// Root redirects to the root for the front end
app.get('/', (req, res, next) => {
	return res.redirect(HOME);
});

// User Routes
app.use('/users', userRoutes);

// Search for lyrics by user input
app.post('/search', async (req, res, next) => {
	try {
		const songData = req.body;
		const result = jsonschema.validate(songData, searchSongSchema);
		if (!result.valid) throw new ExpressError('invalid song data', 400);
		const song = await fetchLyrics(songData);
		song.id = uuidv4();
		return res.json({ song });
	} catch (e) {
		return next(e);
	}
});

// Get a song
app.get('/songs/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const song = await Song.getById(id);
		return res.json({ song });
	} catch (e) {
		return next(e);
	}
});

// Spotify auth for login
app.get('/spotify/auth', (req, res, next) => {
	try {
		const spotifyApi = new SpotifyWebApi({ redirectUri, clientId, clientSecret, state });
		const authUrl = spotifyApi.createAuthorizeURL(scopes, state);
		res.redirect(authUrl);
	} catch (e) {
		return next(e);
	}
});

// Spotify redirect uri for login
app.get('/callback', async (req, res, next) => {
	try {
		const spotifyApi = new SpotifyWebApi({ redirectUri, clientId, clientSecret, state });
		const { code } = req.query;
		const authData = await spotifyApi.authorizationCodeGrant(code);
		const { access_token, refresh_token } = authData.body;
		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);

		// Get user data from Spotify
		const me = await spotifyApi.getMe();
		const { id, display_name, email, href, product } = me.body;
		// const img_url = me.body.images[0].url || null;
		const img_url = getImgUrl(me);
		// Check if user already in DB
		const dbUser = await User.getById(id);
		if (dbUser) {
			const updatedTokens = await User.updateTokens(id, access_token, refresh_token);
			delete dbUser.access_token;
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
