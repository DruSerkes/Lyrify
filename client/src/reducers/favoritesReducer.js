import { ADD_FAVORITE, REMOVE_FAVORITE, GET_USER_FAVORITES } from './actionTypes';
const INITIAL_STATE = {};

const favoritesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_USER_FAVORITES:
			return [ ...action.payload ];
		case ADD_FAVORITE:
			const newFavorite = { id: action.id, song: action.song, artist: action.artist };
			return [ ...state, newFavorite ];
		case REMOVE_FAVORITE:
			const idToRemove = action.id;
			const favoritesCopy = state.filter((fav) => fav.id !== idToRemove);
			return [ ...favoritesCopy ];
		default:
			return state;
	}
};

export default favoritesReducer;
