import { ADD_USER } from './actionTypes';
const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_USER:
			localStorage.setItem('id', action.payload.id);
			return { ...state, user: action.payload };
		// TODO make one for logging out (remove id from localstorage, update state)
		default:
			return state;
	}
};

export default userReducer;
