import { combineReducers } from 'redux';
import { TStore } from '../store/store';
import { readersReducer } from './readers.reducer';
import { booksReducer } from './books.reducer';
import { purchasesReducer } from './purchases.reducer';
import { eventsReducer } from './events.reducer';
import { authorsReducer } from './authors.reducer';

const rootReducer = combineReducers<TStore>({
  readers: readersReducer,
  books: booksReducer,
  purchases: purchasesReducer,
  events: eventsReducer,
  authors: authorsReducer,
});

export default rootReducer;
