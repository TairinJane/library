import { ActionType, getType } from 'typesafe-actions';
import { BookActions } from '../actions/books.actions';
import { TSearch } from '../store/store';
import produce from 'immer';
import { ReadersActions } from '../actions/readers.actions';
import { SearchActions } from '../actions/search.actions';

const stateSearchDefaults: TSearch = {};
type TSearchActions =
  | ActionType<typeof BookActions>
  | ActionType<typeof ReadersActions>
  | ActionType<typeof SearchActions>;

export const searchReducer = (state = stateSearchDefaults, action: TSearchActions): TSearch => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(BookActions.findBooks.request):
        break;
      case getType(BookActions.findBooks.success):
        draft.books = action.payload;
        break;
      case getType(BookActions.findBooks.failure):
        break;
      case getType(ReadersActions.findReaders.request):
        break;
      case getType(ReadersActions.findReaders.success):
        draft.readers = action.payload;
        break;
      case getType(ReadersActions.findReaders.failure):
        break;
      case getType(SearchActions.clearSearch):
        draft.readers = [];
        draft.books = [];
        break;
      case getType(SearchActions.getPurchases.request):
        break;
      case getType(SearchActions.getPurchases.success):
        console.log(action.payload?.length);
        draft.purchases = action.payload;
        break;
      case getType(SearchActions.getPurchases.failure):
        break;
    }
  });
};
