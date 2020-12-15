import { combineReducers } from 'redux';
import { TStore } from '../store/store';
import { booksReducer } from './books.reducer';

const rootReducer = combineReducers<TStore>({
  search: booksReducer,
});

export default rootReducer;
