import { combineReducers } from 'redux';
import { TStore } from '../store/store';
import { searchReducer } from './search.reducer';
import { lendReducer } from './lend.reducer';
import { readersReducer } from './readers.reducer';
import { dueReducer } from './due.reducer';

const rootReducer = combineReducers<TStore>({
  search: searchReducer,
  lend: lendReducer,
  readers: readersReducer,
  due: dueReducer,
});

export default rootReducer;
