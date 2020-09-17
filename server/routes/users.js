const express = require('express');
const User = require('../models/user');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { clientId, clientSecret, redirectUri, scopes, HOME, SECRET_KEY, state } = require('../config');

const spotifyApi = new SpotifyWebApi({ redirectUri, clientId, clientSecret, state });

/**
 * Get a user
 */
router.get('/:id', async (req, res, next) => {
	try {
		console.log('INSIDE ROUTER.GET /:ID');
		console.log('ID ==', req.params.id);
		const { id } = req.params;
		// TODO take another look at this
		const user = await User.getById(id);
		spotifyApi.setAccessToken(user.access_token);
		spotifyApi.setRefreshToken(user.refresh_token);
		delete user.access_token;
		delete user.refresh_token;
		return res.json({ user });
	} catch (e) {
		return next(e);
	}
});

/**
 * Add a favorite
 */
router.post('/:id/favorite', async (req, res, next) => {
	try {
		const { id: user_id } = req.params;
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
router.delete('/:id/favorite', async (req, res, next) => {
	try {
		const { id: user_id } = req.params;
		const { song_id } = req.body;
		// TODO UPDATE User.removeFavorite to return song you're removing ?? (unncessary??)
		const message = await User.removeFavorite(user_id, song_id);
		return res.status(200).json({ message });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
