const axios = require('axios');

const LYRIC_BASE_URL = 'https://api.lyrics.ovh/v1';

const extractSongData = (data) => {
	const album_name = data.item.album.name;
	const album_url = data.item.album.external_urls.spotify;
	const img_url = data.item.album.images[0].url;
	const artist = data.item.artists[0].name;
	const song = data.item.name;
	const id = data.item.id;
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
		const response = await axios.get(`${LYRIC_BASE_URL}/${artist}/${song}`);
		lyrics = response.data.lyrics;
		return lyrics;
	} catch (e) {
		console.log(e);
		lyrics = 'No lyrics found';
		return lyrics;
	}
};

module.exports = { extractSongData, getLyrics };
