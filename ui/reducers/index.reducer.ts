import { combineReducers } from 'redux';
import { TStore } from '../store/store';
import { searchReducer } from './search.reducer';
import { lendReducer } from './lend.reducer';
import { readersInfoReducer } from './readers-info.reducer';

const rootReducer = combineReducers<TStore>({
  search: searchReducer,
  lend: lendReducer,
  readersInfo: readersInfoReducer,
});

export default rootReducer;
