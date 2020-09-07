process.env.NODE_ENV = 'test';

const request = require('supertest');
const User = require('../models/user');
const db = require('../db');
const app = require('../app');
const { expectCt } = require('helmet');

describe('User Model Tests', () => {
	test('can create a user', async () => {
		const newUser = {
			id            : 69,
			display_name  : 'test',
			email         : 'test@test.com',
			product       : 'free',
			href          : 'http://spotify.com/test/123',
			img_url       : 'http://test.com/test.png',
			access_token  : '666',
			refresh_token : '777'
		};
		const response = await User.create(newUser);
		expect(response).toEqual({
			id            : 69,
			display_name  : 'test',
			email         : 'test@test.com',
			product       : 'free',
			href          : 'http://spotify.com/test/123',
			img_url       : 'http://test.com/test.png',
			access_token  : '666',
			refresh_token : '777'
		});
	});
});
