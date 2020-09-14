const axios = require('axios');
const removeWords = require('remove-words');
const wordsToRemove = [ 'Album', 'Version', 'Edit', 'Edited', 'Remix' ];

const LYRIC_BASE_URL = 'https://api.lyrics.ovh/v1';

const removeCommonWords = (text) => removeWords(text).join(' ');

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

const getLyrics = async ({ artist, song }) => {
	let lyrics;
	try {
		const artistNormalized = artist.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		const songNormalized = song.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		const response = await axios.get(`${LYRIC_BASE_URL}/${artistNormalized}/${songNormalized}`);
		lyrics = response.data.lyrics;
		return lyrics;
	} catch (e) {
		console.log(e);
		lyrics = 'No lyrics found';
		return lyrics;
	}
};

module.exports = { extractSongData, getLyrics };
