process.env.NODE_ENV = 'test';

const request = require('supertest');
const User = require('../models/user');
const db = require('../db');
const app = require('../app');

describe('Routes tests', () => {
	beforeEach(async () => {
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
				access_token : '123456789'
			}
		});
	});

	// TODO figure out how to mock signedCookies
	// test('GET /user returns user if user has logged in before', async () => {
	// 	const response = await request(app).get('/users');
	// 	console.log(response);
	// 	expect(response.status).toBe(200);
	// 	expect(response.body).toEqual({
	// 		id           : '13',
	// 		display_name : 'test',
	// 		email        : 'test@test.com',
	// 		product      : 'premium',
	// 		href         : 'http://spotify.com/test',
	// 		img_url      : 'http://testuser.com/picture.jpg',
	// 		access_token : '123456789'
	// 	});
	// });
});
