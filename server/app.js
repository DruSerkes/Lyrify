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

const spotifyApi = new SpotifyWebApi({ clientId, clientSecret, redirectUri });

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

app.get('/user', (req, res, next) => {
	console.log('signed cookies == ', req.signedCookies);
	const { access_token } = req.signedCookies;
	if (!access_token) return next();
	try {
		const user = User.getByAccessToken(access_token);
		return res.json({ user });
	} catch (e) {
		console.log(e);
		return next(e);
	}
});

app.get('/now-playing', async (req, res, next) => {
	try {
		const data = await spotifyApi.getMyCurrentPlaybackState();
		console.log(data);
		// TODO
	} catch (e) {
		console.log(e);
		return next(e);
	}
});

app.get('/spotify/auth', (req, res, next) => {
	try {
		const authUrl = spotifyApi.createAuthorizeURL(scopes);
		console.log('authorize url == ', authUrl);
		res.redirect(authUrl);
	} catch (e) {
		console.log(e);
		return next(e);
	}
});

app.get('/callback', async (req, res, next) => {
	const { code } = req.query;
	// TODO figure out what's going wrong here
	console.log('code recieved successfully \n code == ', code);
	const data = await spotifyApi.authorizationCodeGrant(code);

	try {
		const data = await spotifyApi.authorizationCodeGrant(code);
		console.log('inside /callback try statement \ndata == ', data);
		const { access_token, refresh_token } = data.body;
		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);
		const userData = await spotifyApi.getMe();
		console.log(userData);
		// TODO destructure data properly for db user storage

		// const user = await User.create(userData);
		// delete user.refresh_token;
		// res.cookie('access_token', access_token, { signed: true });
		// localStorage.setItem('access_token', access_token);
		// console.log('db user == ', user);
		// return res.redirect(`${HOME}?${querystring.stringify(user)}`);
	} catch (e) {
		console.log(e);
		return next(e);
	}
});

/*

TODO 
3. ADD TESTS WHENEVER YOU WRITE A NEW ROUTE/FUNCTION 
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
