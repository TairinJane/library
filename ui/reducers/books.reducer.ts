import { ActionType, getType } from 'typesafe-actions';
import { BookActions } from '../actions/books.actions';
import { booksStoreDefaults, TBooksStore } from '../store/store';
import produce from 'immer';

type TSearchActions = ActionType<typeof BookActions>;

export const booksReducer = (state = booksStoreDefaults, action: TSearchActions): TBooksStore => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(BookActions.findBooks.request):
        break;
      case getType(BookActions.findBooks.success):
        draft.search = action.payload;
        break;
      case getType(BookActions.findBooks.failure):
        break;
      case getType(BookActions.lendBook.request):
        draft.lend = { ...action.payload };
        break;
      case getType(BookActions.lendBook.success):
        draft.lend.bookId = action.payload.book.id;
        draft.lend.readerId = action.payload.reader.id;
        draft.lend.isSuccess = true;
        break;
      case getType(BookActions.lendBook.failure):
        draft.lend.isSuccess = false;
        break;
      case getType(BookActions.clearLendInfo):
        draft.lend = { isSuccess: false };
        break;
      case getType(BookActions.fetchDueBooks.request):
        draft.due.isFetching = true;
        break;
      case getType(BookActions.fetchDueBooks.success):
        draft.due.books = action.payload;
        draft.due.isFetching = false;
        break;
      case getType(BookActions.fetchDueBooks.failure):
        draft.due.isFetching = false;
        draft.due.isError = true;
        break;
    }
  });
};
