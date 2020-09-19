import { ADD_SONG, REMOVE_SONG } from './actionTypes';
const INITIAL_STATE = {};

const songreducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_SONG:
			return { ...action.payload };
		case REMOVE_SONG:
			return {};
		default:
			return state;
	}
};

export default songreducer;
