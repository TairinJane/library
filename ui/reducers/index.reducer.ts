import { combineReducers } from 'redux';
import { TStore } from '../store/store';
import { searchReducer } from './searchReducer';
import { lendReducer } from './lend.reducer';

const rootReducer = combineReducers<TStore>({
  search: searchReducer,
  lend: lendReducer,
});

export default rootReducer;
