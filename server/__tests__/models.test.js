process.env.NODE_ENV = 'test';

const request = require('supertest');
const User = require('../models/user');
const Song = require('../models/song');
const db = require('../db');
const app = require('../app');

describe('User Model Tests', () => {
	beforeEach(async () => {
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
		const testUser = await User.create(testUserData);
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
	test('can get user by refresh_token', async () => {
		const user = await User.getByRefreshToken('987654321');
		expect(user).toEqual({
			id            : '13',
			display_name  : 'test',
			email         : 'test@test.com',
			product       : 'premium',
			href          : 'http://spotify.com/test',
			img_url       : 'http://testuser.com/picture.jpg',
			access_token  : '123456789',
			refresh_token : '987654321'
		});
	});

	test('can get user by id', async () => {
		const user = await User.getById('13');
		expect(user).toEqual({
			id            : '13',
			display_name  : 'test',
			email         : 'test@test.com',
			product       : 'premium',
			href          : 'http://spotify.com/test',
			img_url       : 'http://testuser.com/picture.jpg',
			access_token  : '123456789',
			refresh_token : '987654321'
		});
	});
});

describe('song model tests', () => {
	beforeEach(async () => {
		const testSongData = {
			id         : '13',
			artist     : 'sir test-a-lot',
			song       : 'the sword of damacles',
			album_name : 'test name',
			album_url  : 'http://spotify.com/test',
			img_url    : 'http://testsong.com/picture.jpg',
			lyrics     : 'I JUST LOVE TESTING'
		};
		const testSong = await Song.create(testSongData);
	});
	afterEach(async () => {
		await db.query(`DELETE FROM songs`);
	});
	afterAll(async () => {
		await db.end();
	});

	
});
