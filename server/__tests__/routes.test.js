process.env.NODE_ENV = 'test';

const request = require('supertest');
const User = require('../models/user');
const Song = require('../models/song');
const db = require('../db');
const app = require('../app');

describe('Routes tests', () => {
	beforeEach(async () => {
		await db.query(`DELETE FROM users`);
		await db.query(`DELETE FROM songs`);
		const testUserData = {
			id            : '13',
			display_name  : 'test',
			email         : 'test@test.com',
			product       : 'premium',
			href          : 'http://spotify.com/test',
			img_url       : 'http://testuser.com/picture.jpg',
			access_token  : '123456789',
			refresh_token : '987654321'
		};
		const testSongData = {
			id         : '13',
			artist     : 'sir test-a-lot',
			song       : 'test test baby',
			album_name : 'test name',
			album_url  : 'http://spotify.com/test',
			img_url    : 'http://testsong.com/picture.jpg',
			lyrics     : 'I LOVE BIG TESTS AND I CANNOT LIE'
		};
		const testSong = await Song.create(testSongData);
		const testUser = await User.create(testUserData);
	});
	afterEach(async () => {
		await db.query(`DELETE FROM users`);
		await db.query(`DELETE FROM songs`);
	});
	afterAll(async () => {
		await db.end();
	});

	test('GET /users/:id returns user', async () => {
		const response = await request(app).get('/users/13');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			user : {
				id           : '13',
				display_name : 'test',
				email        : 'test@test.com',
				product      : 'premium',
				href         : 'http://spotify.com/test',
				img_url      : 'http://testuser.com/picture.jpg'
			}
		});
	});

	test('POST /users/:id/favorite favorites a song', async () => {
		const response = await request(app).post('/users/13/favorite').send({ song_id: '13' });
		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			song : {
				id         : '13',
				artist     : 'sir test-a-lot',
				song       : 'test test baby',
				album_name : 'test name',
				album_url  : 'http://spotify.com/test',
				img_url    : 'http://testsong.com/picture.jpg',
				lyrics     : 'I LOVE BIG TESTS AND I CANNOT LIE'
			}
		});
		const response2 = await request(app).get('/users/13/favorite');
		expect(response2.status).toBe(200);
		expect(response2.body).toEqual({
			favorites : [
				{
					id     : '13',
					artist : 'sir test-a-lot',
					song   : 'test test baby'
				}
			]
		});
		// const response2 = await request(app).get('/users/13');
		// expect(response2.status).toBe(200);
		// expect(response2.body).toEqual({
		// 	user : {
		// 		id           : '13',
		// 		display_name : 'test',
		// 		email        : 'test@test.com',
		// 		product      : 'premium',
		// 		href         : 'http://spotify.com/test',
		// 		img_url      : 'http://testuser.com/picture.jpg',
		// 		favorites    : [
		// 			{
		// 				id         : '13',
		// 				artist     : 'sir test-a-lot',
		// 				song       : 'test test baby',
		// 				album_name : 'test name',
		// 				album_url  : 'http://spotify.com/test',
		// 				img_url    : 'http://testsong.com/picture.jpg',
		// 				lyrics     : 'I LOVE BIG TESTS AND I CANNOT LIE'
		// 			}
		// 		]
		// 	}
		// });
	});

	test('DELETE /users/:id/favorite removes a favorite', async () => {
		const response = await request(app).post('/users/13/favorite').send({ song_id: 13 });
		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			song : {
				id         : '13',
				artist     : 'sir test-a-lot',
				song       : 'test test baby',
				album_name : 'test name',
				album_url  : 'http://spotify.com/test',
				img_url    : 'http://testsong.com/picture.jpg',
				lyrics     : 'I LOVE BIG TESTS AND I CANNOT LIE'
			}
		});
		const response2 = await request(app).delete('/users/13/favorite').send({ song_id: 13 });
		expect(response2.status).toBe(200);
		expect(response2.body).toEqual({ message: 'Favorite removed' });
		const response3 = await request(app).get('/users/13/favorite');
		expect(response3.status).toBe(200);
		expect(response3.body).toEqual({
			favorites : []
		});
	});

	test('GET /users/:id/favorite returns favorites for user', async () => {
		const response = await request(app).get('/users/13/favorite');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			favorites : []
		});
	});

	test('POST /search returns lyrics', async () => {
		const response = await request(app).post('/search').send({ artist: 'Musiq', song: 'Halfcrazy' });
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			song : {
				id         : expect.any(String),
				artist     : 'Musiq',
				song       : 'Halfcrazy',
				album_name : null,
				album_url  : null,
				img_url    : null,
				lyrics     : expect.any(String)
			}
		});
		expect(response.body.song.lyrics).not.toEqual('No lyrics found');
	});

	test('POST /search returns lyrics if song has extra words', async () => {
		const response = await request(app)
			.post('/search')
			.send({ artist: 'Musiq', song: 'Halfcrazy - Album Version (Edited)' });
		expect(response.status).toBe(200);
		expect(response.body).not.toEqual({
			song : {
				id         : expect.any(String),
				artist     : 'Musiq',
				song       : 'Halfcrazy',
				album_name : null,
				album_url  : null,
				img_url    : null,
				lyrics     : expect.any(String)
			}
		});
	});

	test('POST /search returns "No lyrics found" if no lyrics are found', async () => {
		const response = await request(app).post('/search').send({ artist: 'Musiq', song: 'thisisnotasongblahhh' });
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			song : {
				id         : expect.any(String),
				artist     : 'Musiq',
				song       : 'thisisnotasongblahhh',
				album_name : null,
				album_url  : null,
				img_url    : null,
				lyrics     : 'No lyrics found'
			}
		});
	});

	test('GET /songs/:id returns a song', async () => {
		const response = await request(app).get('/songs/13');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			song : {
				id         : '13',
				artist     : 'sir test-a-lot',
				song       : 'test test baby',
				album_name : 'test name',
				album_url  : 'http://spotify.com/test',
				img_url    : 'http://testsong.com/picture.jpg',
				lyrics     : 'I LOVE BIG TESTS AND I CANNOT LIE'
			}
		});
	});
});
