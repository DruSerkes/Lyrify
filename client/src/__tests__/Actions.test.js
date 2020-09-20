import {
	getUser,
	gotUser,
	logoutUser,
	getNowPlaying,
	gotNowPlaying,
	getSong,
	gotSong,
	getNewSong,
	removeSong,
	addFavorite,
	addedFavorite,
	removeFavorite,
	removedFavorite,
	getFavorites,
	gotFavorites
} from '../reducers/actions';
import axios from 'axios';

jest.mock('axios');

describe('Action tests', () => {
	const songData = { id: 1, song: 'test', artist: 'the testers' };
	it('returns an object with type and payload', () => {
		const result = gotUser({ id: 1, display_name: 'test_name' });
		expect(result).toEqual({
			type    : 'ADD_USER',
			payload : { id: 1, display_name: 'test_name' }
		});
	});
	it('returns a function', () => {
		const result = getUser(13);
		expect(result).toBeInstanceOf(Function);
	});
	it('returns an object with type of REMOVE_USER', () => {
		expect(logoutUser()).toEqual({ type: 'REMOVE_USER' });
	});
	it('returns a function', () => {
		expect(getNowPlaying(13)).toBeInstanceOf(Function);
	});
	it('returns an object with type and payload', () => {
		expect(gotNowPlaying(songData)).toEqual({
			type    : 'ADD_SONG',
			payload : songData
		});
	});
	it('returns a function', () => {
		expect(getSong(songData)).toBeInstanceOf(Function);
	});
	it('returns an object with type and payload', () => {
		expect(gotSong(songData)).toEqual({
			type    : 'ADD_SONG',
			payload : songData
		});
	});
	it('returns a function', () => {
		expect(getNewSong(1)).toBeInstanceOf(Function);
	});
	it('returns an object with type and payload', () => {
		expect(removeSong()).toEqual({
			type : 'REMOVE_SONG'
		});
	});
	it('returns a function', () => {
		expect(addFavorite(1, 1)).toBeInstanceOf(Function);
	});
	it('returns an object with type and payload', () => {
		expect(addedFavorite(songData)).toEqual({
			type    : 'ADD_FAVORITE',
			payload : songData
		});
	});
	it('returns a function', () => {
		expect(removeFavorite(1, 1)).toBeInstanceOf(Function);
	});
	it('returns an object with type and payload', () => {
		expect(removedFavorite(1)).toEqual({
			type : 'REMOVE_FAVORITE',
			id   : 1
		});
	});
	it('returns a function', () => {
		expect(getFavorites(1)).toBeInstanceOf(Function);
	});
	it('returns an object with type and payload', () => {
		expect(gotFavorites([ 1, 2, 3, 4 ])).toEqual({
			type    : 'GET_USER_FAVORITES',
			payload : [ 1, 2, 3, 4 ]
		});
	});
});
