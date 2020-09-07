import { getUser, gotUser } from '../reducers/actions';
import axios from 'axios';

jest.mock('axios');

describe('User action tests', () => {
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

	// it('returns user an object with keys of type and payload', async () => {
	// 	const testUser = {
	// 		id           : '13',
	// 		display_name : 'test',
	// 		email        : 'test@test.com',
	// 		product      : 'premium',
	// 		href         : 'http://spotify.com/test',
	// 		img_url      : 'http://testuser.com/picture.jpg',
	// 		access_token : '123456789'
	// 	};
	// 	const resp = { data: testUser };
	// 	axios.get.mockResolvedValue(resp);
	// 	const result = await getUser('13')();
	// 	expect(result).toEqual({
	// 		type    : 'ADD_USER',
	// 		payload : {
	// 			id           : '13',
	// 			display_name : 'test',
	// 			email        : 'test@test.com',
	// 			product      : 'premium',
	// 			href         : 'http://spotify.com/test',
	// 			img_url      : 'http://testuser.com/picture.jpg',
	// 			access_token : '123456789'
	// 		}
	// 	});
	// });
});
