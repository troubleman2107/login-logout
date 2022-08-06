import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// const store = (initialState) => createStore(reducer, initialState, applyMiddleware(thunk));
const store = createStore(reducer, {}, applyMiddleware(thunk));
export default store;
