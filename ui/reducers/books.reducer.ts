import { ActionType, getType } from 'typesafe-actions';
import { BookActions } from '../actions/books.actions';
import { TSearch } from '../store/store';
import produce from 'immer';

const stateSearchDefaults: TSearch = {};
type TBooksActions = ActionType<typeof BookActions>;

export const booksReducer = (state = stateSearchDefaults, action: TBooksActions): TSearch => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(BookActions.getBooks.request):
        break;
      case getType(BookActions.getBooks.success):
        console.log('success in reducer:', action.payload);
        draft.books = action.payload;
        break;
      case getType(BookActions.getBooks.failure):
        break;
    }
  });
};
