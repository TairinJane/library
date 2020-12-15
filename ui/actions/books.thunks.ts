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

export const BooksThunks = {
  findBooks,
};
