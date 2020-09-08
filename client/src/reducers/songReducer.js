import { ADD_SONG } from './actionTypes';
const INITIAL_STATE = {};

const songreducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_SONG:
			return { ...state, song: action.payload };
		default:
			return state;
	}
};

export default songreducer;
