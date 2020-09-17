const axios = require('axios');
const removeWords = require('remove-words');
const wordsToRemove = [ 'Album', 'Version', 'Edit', 'Edited', 'Remix' ];
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
	let lyrics = await getLyrics(songData);
	if (lyrics === 'No lyrics found') {
		lyrics = await getLyricsWordsRemoved(songData);
		songData.lyrics = lyrics;
		const song = await Song.create(songData);
		return song;
	} else {
		songData.lyrics = lyrics;
		const song = await Song.create(songData);
		return song;
	}
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

const getLyricsWordsRemoved = async ({ artist, song }) => {
	try {
		const artistNormalized = normalizeString(artist);
		const songNormalized = normalizeString(song);
		const songWordsRemoved = removeCommonWords(songNormalized);
		console.log('songWordsRemoved === ', songWordsRemoved);
		const response = await axios.get(`${LYRIC_BASE_URL}/${artistNormalized}/${songWordsRemoved}`);
		console.log('response === ', response);
		return response.data.lyrics;
	} catch (e) {
		console.log(e);
		return e.response.data.error;
	}
};

module.exports = {
	fetchAndAddLyrics,
	extractSongData,
	getLyricsWordsRemoved,
	getLyrics,
	removeCommonWords,
	normalizeString
};
