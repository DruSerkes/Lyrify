const express = require('express');
const User = require('../models/user');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { extractSongData, fetchAndAddLyrics } = require('../helpers/helpers');
const { clientId, clientSecret, redirectUri, state } = require('../config');

// const spotifyApi = new SpotifyWebApi({ redirectUri, clientId, clientSecret, state });

/**
 * Get a user
 */
router.get('/:id', async (req, res, next) => {
	try {
		const spotifyApi = new SpotifyWebApi({ redirectUri, clientId, clientSecret, state });
		const { id } = req.params;
		const user = await User.getById(id);
		spotifyApi.setAccessToken(user.access_token);
		spotifyApi.setRefreshToken(user.refresh_token);
		// console.log('spotifyApi == ', spotifyApi);
		// const response = await spotifyApi.refreshAccessToken();
		// const newAccessToken = await User.updateAccessToken(id, response.body.access_token);
		// console.log('newAccessToken == ', newAccessToken);
		// spotifyApi.setAccessToken(newAccessToken);
		delete user.access_token;
		delete user.refresh_token;
		return res.json({ user });
	} catch (e) {
		return next(e);
	}
});

/**
 * Get a user's now playing song on Spotify 
 */
router.get('/:id/now-playing', async (req, res, next) => {
	try {
		// get user access/refresh tokens from db
		const { id } = req.params;
		const user = await User.getById(id);
		// pass to spotifyApi
		const spotifyApi = new SpotifyWebApi({ redirectUri, clientId, clientSecret, state });
		spotifyApi.setAccessToken(user.access_token);
		spotifyApi.setRefreshToken(user.refresh_token);
		// go get it
		const data = await spotifyApi.getMyCurrentPlayingTrack();
		if (data.body.currently_playing_type !== 'track') {
			const message = 'No song currently playing';
			return res.json({ message });
		} else {
			const songData = extractSongData(data.body);
			const song = await fetchAndAddLyrics(songData);
			return res.json({ song });
		}
	} catch (e) {
		return next(e);
	}
});

/**
 * GET favorite list for a user
 */
router.get('/:id/favorite', async (req, res, next) => {
	try {
		const { id } = req.params;
		const favorites = await User.getFavorites(id);
		return res.json({ favorites });
	} catch (e) {
		return next(e);
	}
});

/**
 * Add a favorite
 */
router.post('/:user_id/favorite', async (req, res, next) => {
	try {
		const { user_id } = req.params;
		const { song_id } = req.body;
		const song = await User.addFavorite(user_id, song_id);
		return res.status(201).json({ song });
	} catch (e) {
		return next(e);
	}
});

/**
 * Delete a favorite
 */
router.delete('/:user_id/favorite/:song_id', async (req, res, next) => {
	try {
		const { user_id, song_id } = req.params;
		const message = await User.removeFavorite(user_id, song_id);
		return res.status(200).json({ message });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
