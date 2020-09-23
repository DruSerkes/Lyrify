process.env.NODE_ENV = 'test';

const db = require('../db');
const {
	removeCommonWords,
	getLyrics,
	extractSongData,
	normalizeString,
	getLyricsWordsRemoved,
	fetchAndAddLyrics,
	getImgUrl
} = require('../helpers/helpers');

describe('helpers tests', () => {
	afterAll(async () => {
		await db.query(`DELETE FROM songs`);
		await db.end();
	});
	it('should remove commonly added words to song titles', () => {
		let testSong = 'Halfcrazy - Album Version (Edited Remix)';
		const result = removeCommonWords(testSong);
		expect(result).toEqual('halfcrazy');
	});

	it('should extract nested song data', () => {
		let testData = {
			item : {
				album   : {
					name          : 'testAlbum',
					external_urls : {
						spotify : 'testUrl'
					},
					images        : [ { url: 'ignoreMe' }, { url: 'testImage' } ]
				},
				artists : [ { name: 'testArtist' } ],
				name    : 'testSong',
				id      : '666'
			}
		};
		expect(extractSongData(testData)).toEqual({
			id         : '666',
			song       : 'testSong',
			artist     : 'testArtist',
			album_name : 'testAlbum',
			album_url  : 'testUrl',
			img_url    : 'testImage'
		});
	});

	it('should remove accents from a string', () => {
		expect(normalizeString('Jhenè Aikò')).toEqual('Jhene Aiko');
	});

	it('should return an image url', () => {
		let testData = {
			body : {
				images : [ { url: 'ignoreMe' }, { url: 'testImage' } ]
			}
		};
		let img_url = getImgUrl(testData);
		expect(img_url).toEqual('ignoreMe');
	});

	it('should return null', () => {
		let testData = {
			body : {
				name   : 'tester',
				images : []
			}
		};
		let img_url = getImgUrl(testData);
		expect(img_url).toEqual(null);
	});

	// FRAGILE TESTS - AXIOS SHOULD BE MOCKED
	// it('should get lyrics', async () => {
	// 	const lyrics = await getLyrics({ artist: 'Musiq', song: 'Halfcrazy' });
	// 	expect(lyrics).not.toMatch('No lyrics found');
	// });

	// it('should return "No Lyrics Found" when it fails', async () => {
	// 	const lyrics = await getLyrics({ artist: 'Musiq', song: 'agjaogja' });
	// 	expect(lyrics).toMatch('No lyrics found');
	// });

	// it('should get lyrics when common extra words are in song', async () => {
	// 	const lyrics = await getLyricsWordsRemoved({ artist: 'Musiq', song: 'Halfcrazy - Album Version (Edited)' });
	// 	expect(lyrics).not.toMatch('No lyrics found');
	// });

	// it('should also return "No Lyrics Found" when it fails', async () => {
	// 	const lyrics = await getLyricsWordsRemoved({ artist: 'Musiq', song: 'agjaogja' });
	// 	expect(lyrics).toMatch('No lyrics found');
	// });

	// it('should return a song object', async () => {
	// 	const song = await fetchAndAddLyrics({ artist: 'Musiq', song: 'Halfcrazy' });
	// 	expect(song).toEqual({
	// 		id         : expect.any(String),
	// 		artist     : 'Musiq',
	// 		song       : 'Halfcrazy',
	// 		album_name : null,
	// 		album_url  : null,
	// 		img_url    : null,
	// 		lyrics     : expect.any(String)
	// 	});
	// 	expect(song.lyrics).not.toEqual('No lyrics found');
	// });
});
