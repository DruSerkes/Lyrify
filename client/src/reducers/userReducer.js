import { ADD_USER } from './actionTypes';
const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

export default userReducer;
