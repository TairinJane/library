import { ActionType, getType } from 'typesafe-actions';
import { BookActions } from '../actions/books.actions';
import { TSearch } from '../store/store';
import produce from 'immer';
import { ReadersActions } from '../actions/readers.actions';

const stateSearchDefaults: TSearch = {};
type TSearchActions = ActionType<typeof BookActions> | ActionType<typeof ReadersActions>;

export const searchReducer = (state = stateSearchDefaults, action: TSearchActions): TSearch => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(BookActions.findBooks.request):
        break;
      case getType(BookActions.findBooks.success):
        console.log('reducer books:', action.payload?.length);
        draft.books = action.payload;
        break;
      case getType(BookActions.findBooks.failure):
        break;
      case getType(ReadersActions.findReaders.request):
        break;
      case getType(ReadersActions.findReaders.success):
        console.log('reducer readers:', action.payload?.length);
        draft.readers = action.payload;
        break;
      case getType(ReadersActions.findReaders.failure):
        break;
    }
  });
};
