import { Dispatch } from 'redux';
import { BookActions } from './books.actions';
import { BooksApi } from '../api/books.api';

const getBooks = (title?: string, authorFirstName?: string, authorLastName?: string) => {
  return (dispatch: Dispatch) => {
    const meta = { title, authorFirstName, authorLastName };
    dispatch(BookActions.getBooks.request(undefined, meta));
    return BooksApi.getBooks(title, authorFirstName, authorLastName)
      .then(json => dispatch(BookActions.getBooks.success(json, meta)))
      .catch(() => dispatch(BookActions.getBooks.failure(undefined, meta)));
  };
};

export const SearchThunks = {
  getBooks,
};
