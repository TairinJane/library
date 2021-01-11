import { Dispatch } from 'redux';
import { BookActions } from './books.actions';
import { BooksApi } from '../api/books.api';

const findBooks = (title?: string, authorFirstName?: string, authorLastName?: string) => {
  return (dispatch: Dispatch) => {
    const meta = { title, authorFirstName, authorLastName };
    dispatch(BookActions.findBooks.request(undefined, meta));
    return BooksApi.getBooks(title, authorFirstName, authorLastName)
      .then(json => dispatch(BookActions.findBooks.success(json, meta)))
      .catch(() => dispatch(BookActions.findBooks.failure(undefined, meta)));
  };
};

const lendBook = (readerId: number, bookId: number, employeeId = 30) => {
  return (dispatch: Dispatch) => {
    const payload = { readerId, bookId, employeeId };
    dispatch(BookActions.lendBook.request(payload));
    return BooksApi.lendBook(readerId, bookId, employeeId)
      .then(json => dispatch(BookActions.lendBook.success(json, payload)))
      .catch(() => dispatch(BookActions.lendBook.failure(payload)));
  };
};

const fetchDueBooks = () => {
  return (dispatch: Dispatch) => {
    dispatch(BookActions.fetchDueBooks.request());
    return BooksApi.fetchDueBooks()
      .then(json => dispatch(BookActions.fetchDueBooks.success(json)))
      .catch(() => dispatch(BookActions.fetchDueBooks.failure()));
  };
};

export const BooksThunks = {
  findBooks,
  lendBook,
  fetchDueBooks,
};
