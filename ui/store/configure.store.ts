import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.reducer';

export const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));
