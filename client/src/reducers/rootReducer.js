import songReducer from './songReducer';
import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ song: songReducer, user: userReducer, favorites: favoritesReducer });

export default rootReducer;
