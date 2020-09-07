process.env.NODE_ENV = 'test';

const request = require('supertest');
const User = require('../models/user');
const db = require('../db');
const app = require('../app');

describe('User Model Tests', () => {
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
	test('can create a user', async () => {
		const newUser = {
			id            : 69,
			display_name  : 'test',
			email         : 'newuser@test.com',
			product       : 'free',
			href          : 'http://spotify.com/test/123',
			img_url       : 'http://test.com/test.png',
			access_token  : '666',
			refresh_token : '777'
		};
		const response = await User.create(newUser);
		expect(response).toEqual({
			id            : '69',
			display_name  : 'test',
			email         : 'newuser@test.com',
			product       : 'free',
			href          : 'http://spotify.com/test/123',
			img_url       : 'http://test.com/test.png',
			access_token  : '666',
			refresh_token : '777'
		});
	});
	test('can get user by access_token', async () => {
		const user = await User.getByAccessToken('123456789');
		expect(user).toEqual({
			id           : '13',
			display_name : 'test',
			email        : 'test@test.com',
			product      : 'premium',
			href         : 'http://spotify.com/test',
			img_url      : 'http://testuser.com/picture.jpg',
			access_token : '123456789'
		});
	});

	test('can get user by id', async () => {
		const user = await User.getById('13');
		expect(user).toEqual({
			id           : '13',
			display_name : 'test',
			email        : 'test@test.com',
			product      : 'premium',
			href         : 'http://spotify.com/test',
			img_url      : 'http://testuser.com/picture.jpg',
			access_token : '123456789'
		});
	});
});
