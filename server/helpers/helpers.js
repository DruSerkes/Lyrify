const axios = require('axios');
const removeWords = require('remove-words');
// ^ this passes tests
// but breaks in production unless I get rid of .main
// Unclear as to why...
const wordsToRemove = [ 'Album', 'Version', 'Edit', 'Edited', 'Remix', 'New Version', 'New', '-' ];
const Song = require('../models/song');

const LYRIC_BASE_URL = 'https://api.lyrics.ovh/v1';

const removeCommonWords = (text) => removeWords(text, false, wordsToRemove).join(' ');

const extractSongData = (data) => {
	const album_name = data.item.album.name || null;
	const album_url = data.item.album.external_urls.spotify || null;
	const img_url = data.item.album.images[1].url || null;
	const artist = data.item.artists[0].name || null;
	const song = data.item.name || null;
	const id = data.item.id || null;
	return {
		id,
		song,
		artist,
		album_name,
		album_url,
		img_url
	};
};

const normalizeString = (string) => {
	return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const fetchAndAddLyrics = async (songData) => {
	songData = await fetchLyrics(songData);
	const song = await Song.create(songData);
	return song;
};

const getLyrics = async ({ artist, song }) => {
	try {
		const artistNormalized = normalizeString(artist);
		const songNormalized = normalizeString(song);
		const response = await axios.get(`${LYRIC_BASE_URL}/${artistNormalized}/${songNormalized}`);
		return response.data.lyrics;
	} catch (e) {
		console.log(e);
		return e.response.data.error;
	}
};

const fetchLyrics = async (songData) => {
	let lyrics = await getLyrics(songData);
	if (lyrics === 'No lyrics found') {
		lyrics = await getLyricsWordsRemoved(songData);
		songData.lyrics = lyrics;
		return songData;
	} else {
		songData.lyrics = lyrics;
		return songData;
	}
};

const getLyricsWordsRemoved = async ({ artist, song }) => {
	try {
		const artistNormalized = normalizeString(artist);
		const songNormalized = normalizeString(song);
		const songWordsRemoved = removeCommonWords(songNormalized);
		const response = await axios.get(`${LYRIC_BASE_URL}/${artistNormalized}/${songWordsRemoved}`);
		return response.data.lyrics;
	} catch (e) {
		console.log(e);
		return e.response.data.error;
	}
};

/**
 * Extracts img url from spotify user data - returns null if cannot read property
 */
const getImgUrl = (data) => {
	try {
		return data.body.images[0].url;
	} catch (e) {
		console.log(e);
		return null;
	}
};

module.exports = {
	fetchLyrics,
	fetchAndAddLyrics,
	extractSongData,
	getLyricsWordsRemoved,
	getLyrics,
	removeCommonWords,
	normalizeString,
	getImgUrl
};
