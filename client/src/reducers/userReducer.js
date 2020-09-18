import { ADD_FAVORITE, ADD_USER, REMOVE_USER, REMOVE_FAVORITE } from './actionTypes';
const INITIAL_STATE = {};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_USER:
			// localStorage.setItem('id', action.payload.id);
			console.log('INSIDE USER REDUCER. PAYLOAD ==', action.payload);
			return { ...state, ...action.payload };
		case REMOVE_USER:
			// localStorage.removeItem('id');
			return {};
		case ADD_FAVORITE:
			let idToAdd = action.payload.id;
			return { ...state, favorites: { ...state.favorites, [idToAdd]: action.payload } };
		case REMOVE_FAVORITE:
			const idToRemove = action.id;
			const favoritesCopy = state.favorites;
			delete favoritesCopy[idToRemove];
			return { ...state, favorites: { ...favoritesCopy } };
		default:
			return state;
	}
};

export default userReducer;
