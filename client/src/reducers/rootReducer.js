import songReducer from './songReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ song: songReducer, user: userReducer });

export default rootReducer;
