import { createAsyncAction } from 'typesafe-actions';
import { TBook } from '../store/store';

type TBooksMeta = { title?: string; authorFirstName?: string; authorLastName?: string };

const findBooks = createAsyncAction('BOOKS/GET_BOOKS_REQ', 'BOOKS/GET_BOOKS_SUCCESS', 'BOOKS/GET_BOOKS_ERROR')<
  [undefined, TBooksMeta],
  [TBook[], TBooksMeta],
  [undefined, TBooksMeta]
>();

export const BookActions = {
  findBooks,
};
