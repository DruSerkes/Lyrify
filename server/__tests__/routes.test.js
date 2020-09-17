process.env.NODE_ENV = 'test';

const request = require('supertest');
const User = require('../models/user');
const db = require('../db');
const app = require('../app');

describe('Routes tests', () => {
	beforeEach(async () => {
		await db.query(`DELETE FROM users`);
		const testData = {
			id            : '13',
			display_name  : 'test',
			email         : 'test@test.com',
			product       : 'premium',
			href          : 'http://spotify.com/test',
			img_url       : 'http://testuser.com/picture.jpg',
			access_token  : '123456789',
			refresh_token : '987654321'
		};
		const testUser = await User.create(testData);
	});
	afterEach(async () => {
		await db.query(`DELETE FROM users`);
	});
	afterAll(async () => {
		await db.end();
	});

	test('GET /user/:id returns user', async () => {
		const response = await request(app).get('/users/13');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			user : {
				id           : '13',
				display_name : 'test',
				email        : 'test@test.com',
				product      : 'premium',
				href         : 'http://spotify.com/test',
				img_url      : 'http://testuser.com/picture.jpg',
				favorites    : []
			}
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
});
