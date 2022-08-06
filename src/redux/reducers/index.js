import { combineReducers } from 'redux';
import { userReducer } from './api';

const rootReducers = combineReducers({
    user: userReducer
});
export default rootReducers;
