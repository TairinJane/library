import { ActionType, getType } from 'typesafe-actions';
import { BookActions } from '../actions/books/books.actions';
import { booksStoreDefaults, TBooksStore, TBorrowedBook } from '../store/store';
import produce from 'immer';
import { TLoadableState } from '../utils/state.utils';

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
        draft.due.entities = action.payload;
        draft.due.isFetching = false;
        break;
      case getType(BookActions.fetchDueBooks.failure):
        draft.due.isFetching = false;
        draft.due.isError = true;
        break;
      case getType(BookActions.saveBookInfo):
        draft.profiles[action.payload.id] = {
          ...state.profiles[action.payload.id],
          info: {
            ...TLoadableState.DEFAULT,
            book: action.payload,
          },
        };
        break;
      case getType(BookActions.getBookInfo.request):
        if (!state.profiles[action.payload]) draft.profiles[action.payload] = {};
        draft.profiles[action.payload].info = { ...TLoadableState.REQUEST };
        break;
      case getType(BookActions.getBookInfo.success):
        draft.profiles[action.payload.id].info = { ...TLoadableState.SUCCESS, book: action.payload };
        break;
      case getType(BookActions.getBookInfo.failure):
        draft.profiles[action.payload].info = { ...TLoadableState.ERROR };
        break;
      case getType(BookActions.getHistory.request):
        draft.profiles[action.payload] = {
          ...state.profiles[action.payload],
          history: { ...TLoadableState.SUCCESS, entities: [] },
          hands: { ...TLoadableState.SUCCESS, entities: [] },
        };
        break;
      case getType(BookActions.getHistory.success):
        const history: TBorrowedBook[] = [];
        const hands: TBorrowedBook[] = [];
        action.payload.forEach(book => (book.returnDate ? history.push(book) : hands.push(book)));
        draft.profiles[action.meta] = {
          ...state.profiles[action.meta],
          history: { ...TLoadableState.SUCCESS, entities: history },
          hands: { ...TLoadableState.SUCCESS, entities: hands },
        };
        break;
      case getType(BookActions.getHistory.failure):
        draft.profiles[action.payload] = {
          ...state.profiles[action.payload],
          history: { ...TLoadableState.ERROR, entities: [] },
          hands: { ...TLoadableState.ERROR, entities: [] },
        };
    }
  });
};
