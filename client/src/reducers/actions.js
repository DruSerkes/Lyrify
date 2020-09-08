import { ADD_USER, REMOVE_USER } from './actionTypes';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function getUser(id) {
	return async function(dispatch) {
		const res = await axios.get(`${BASE_URL}/users/${id}`);
		dispatch(gotUser(res.data));
	};
}

export function gotUser(userData) {
	return {
		type    : ADD_USER,
		payload : userData
	};
}

export function logoutUser() {
	return {
		type : REMOVE_USER
	};
}
