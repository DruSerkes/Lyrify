import { ADD_USER, REMOVE_USER } from './actionTypes';
const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_USER:
			localStorage.setItem('id', action.payload.id);
			return { ...state, user: action.payload };
		case REMOVE_USER:
			localStorage.removeItem('id');
			return { ...state, user: {} };
		default:
			return state;
	}
};

export default userReducer;
