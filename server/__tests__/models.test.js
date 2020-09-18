process.env.NODE_ENV = 'test';

const request = require('supertest');
const User = require('../models/user');
const Song = require('../models/song');
const db = require('../db');
const app = require('../app');

describe('User Model Tests', () => {
	let testUser;
	let testSong;
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
		testUser = await User.create(testUserData);
		const testSongData = {
			id         : '13',
			artist     : 'sir test-a-lot',
			song       : 'the sword of damacles',
			album_name : 'test name',
			album_url  : 'http://spotify.com/test',
			img_url    : 'http://testsong.com/picture.jpg',
			lyrics     : 'I JUST LOVE TESTING'
		};
		testSong = await Song.create(testSongData);
	});
	afterEach(async () => {
		await db.query(`DELETE FROM users`);
		await db.query(`DELETE FROM songs`);
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

	test('can favorite a song', async () => {
		const result = await User.addFavorite('13', '13');
		expect(result).toEqual({
			id         : '13',
			artist     : 'sir test-a-lot',
			song       : 'the sword of damacles',
			album_name : 'test name',
			album_url  : 'http://spotify.com/test',
			img_url    : 'http://testsong.com/picture.jpg',
			lyrics     : 'I JUST LOVE TESTING'
		});
	});

	test('can unfavorite a song', async () => {
		const result = await User.addFavorite('13', '13');
		expect(result).toEqual({
			id         : '13',
			artist     : 'sir test-a-lot',
			song       : 'the sword of damacles',
			album_name : 'test name',
			album_url  : 'http://spotify.com/test',
			img_url    : 'http://testsong.com/picture.jpg',
			lyrics     : 'I JUST LOVE TESTING'
		});

		// REMOVING FAVORITE
		const result2 = await User.removeFavorite('13', '13');
		expect(result2).toEqual('Favorite removed');
		user = await User.getById('13');
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

	test('can get favorites for a user', async () => {
		const song = await User.addFavorite('13', '13');
		const favorites = await User.getFavorites('13');
		expect(favorites).toEqual([
			{
				id     : song.id,
				song   : song.song,
				artist : song.artist
			}
		]);
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

	test('can create a song', async () => {
		const newSong = {
			id         : '666',
			artist     : 'testmaster flash',
			song       : 'test like a man',
			album_name : 'test album',
			album_url  : 'http://spotify.com/testing',
			img_url    : 'http://testsong.com/testpicture.jpg',
			lyrics     : 'I JUST LOVE TESTING SO MUCH LIKE OMG LOL'
		};
		const response = await Song.create(newSong);
		expect(response).toEqual({
			id         : '666',
			artist     : 'testmaster flash',
			song       : 'test like a man',
			album_name : 'test album',
			album_url  : 'http://spotify.com/testing',
			img_url    : 'http://testsong.com/testpicture.jpg',
			lyrics     : 'I JUST LOVE TESTING SO MUCH LIKE OMG LOL'
		});
	});

	test('creating a song without id generates random id', async () => {
		const newSong = {
			artist : 'testmaster flash',
			song   : 'test like a man',
			lyrics : 'I JUST LOVE TESTING SO MUCH LIKE OMG LOL'
		};
		const response = await Song.create(newSong);
		expect(response).toEqual({
			id         : expect.any(String),
			artist     : 'testmaster flash',
			song       : 'test like a man',
			album_name : null,
			album_url  : null,
			img_url    : null,
			lyrics     : 'I JUST LOVE TESTING SO MUCH LIKE OMG LOL'
		});
	});

	test('can get a song', async () => {
		const response = await Song.getById('13');
		expect(response).toEqual({
			id         : '13',
			artist     : 'sir test-a-lot',
			song       : 'the sword of damacles',
			album_name : 'test name',
			album_url  : 'http://spotify.com/test',
			img_url    : 'http://testsong.com/picture.jpg',
			lyrics     : 'I JUST LOVE TESTING'
		});
	});
});
