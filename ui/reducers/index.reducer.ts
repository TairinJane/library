import { combineReducers } from 'redux';
import { TStore } from '../store/store';
import { searchReducer } from './searchReducer';

const rootReducer = combineReducers<TStore>({
  search: searchReducer,
});

export default rootReducer;
