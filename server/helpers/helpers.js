const axios = require('axios');
const { response } = require('express');
const removeWords = require('remove-words').main;
const wordsToRemove = [ 'Album', 'Version', 'Edit', 'Edited', 'Remix' ];

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
		let songWordsRemoved = removeCommonWords(song);
		const response = await axios.get(`${LYRIC_BASE_URL}/${artist}/${songWordsRemoved}`);
		return response.data.lyrics;
	} catch (e) {
		console.log(e);
		return e.response.data.error;
	}
};

module.exports = { extractSongData, getLyricsWordsRemoved, getLyrics, removeCommonWords, normalizeString };
