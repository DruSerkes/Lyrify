import {
	ADD_USER,
	REMOVE_USER,
	ADD_SONG,
	REMOVE_SONG,
	ADD_FAVORITE,
	REMOVE_FAVORITE,
	GET_USER_FAVORITES
} from './actionTypes';
import axios from 'axios';

const BASE_URL = `https://lyrify-server.herokuapp.com`;
// ^ PRODUCTION
// const BASE_URL = 'http://localhost:5000';
// ^ DEVELOPMENT

export function getUser(id) {
	return async function(dispatch) {
		const res = await axios.get(`${BASE_URL}/users/${id}`);
		dispatch(gotUser(res.data.user));
	};
}

export function gotUser(userData) {
	return {
		type    : ADD_USER,
		payload : userData
	};
}

export function logoutUser() {
	return {
		type : REMOVE_USER
	};
}

export function getNowPlaying(id) {
	return async function(dispatch) {
		const res = await axios.get(`${BASE_URL}/users/${id}/now-playing/`);
		dispatch(gotNowPlaying(res.data.song));
	};
}

export function gotNowPlaying(songData) {
	return {
		type    : ADD_SONG,
		payload : songData
	};
}

export function getSong(data) {
	return async function(dispatch) {
		const { song, artist } = data;
		const res = await axios.post(`${BASE_URL}/search`, { song, artist });
		dispatch(gotSong(res.data.song));
	};
}

export function gotSong(songData) {
	return {
		type    : ADD_SONG,
		payload : songData
	};
}

export function getNewSong(id) {
	return async function(dispatch) {
		const res = await axios.get(`${BASE_URL}/songs/${id}`);
		dispatch(gotSong(res.data.song));
	};
}

export function removeSong() {
	return {
		type : REMOVE_SONG
	};
}

export function addFavorite(user_id, song_id) {
	return async function(dispatch) {
		const res = await axios.post(`${BASE_URL}/users/${user_id}/favorite`, { song_id });
		dispatch(addedFavorite(res.data.song));
	};
}

export function addedFavorite(songData) {
	return {
		type    : ADD_FAVORITE,
		payload : songData
	};
}

export function removeFavorite(user_id, song_id) {
	return async function(dispatch) {
		await axios.delete(`${BASE_URL}/users/${user_id}/favorite/${song_id}`);
		dispatch(removedFavorite(song_id));
	};
}

export function removedFavorite(song_id) {
	return {
		type : REMOVE_FAVORITE,
		id   : song_id
	};
}

export function getFavorites(user_id) {
	return async function(dispatch) {
		const res = await axios.get(`${BASE_URL}/users/${user_id}/favorite`);
		dispatch(gotFavorites(res.data.favorites));
	};
}

export function gotFavorites(favorites) {
	return {
		type    : GET_USER_FAVORITES,
		payload : [ ...favorites ]
	};
}
