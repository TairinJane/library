import { createAction, createAsyncAction } from 'typesafe-actions';
import { TBook, TBorrowedBook } from '../store/store';

type TBooksMeta = { title?: string; authorFirstName?: string; authorLastName?: string };

const findBooks = createAsyncAction('BOOKS/GET_BOOKS_REQ', 'BOOKS/GET_BOOKS_SUCCESS', 'BOOKS/GET_BOOKS_ERROR')<
  [undefined, TBooksMeta],
  [TBook[], TBooksMeta],
  [undefined, TBooksMeta]
>();

type TLendPayload = {
  readerId: number;
  bookId: number;
  employeeId: number;
};

const lendBook = createAsyncAction('LEND/LEND_REQ', 'LEND/LEND_SUCCESS', 'LEND/LEND_ERROR')<
  TLendPayload,
  [TBorrowedBook, TLendPayload],
  TLendPayload
>();

const clearLendInfo = createAction('LEND/CLEAR_INFO')();

const fetchDueBooks = createAsyncAction('BOOKS/DUE_BOOKS_REQ', 'BOOKS/DUE_BOOKS_SUCCESS', 'BOOKS/DUE_BOOKS_ERROR')<
  [undefined, undefined],
  TBorrowedBook[],
  [undefined, undefined]
>();

export const BookActions = {
  findBooks,
  lendBook,
  clearLendInfo,
  fetchDueBooks,
};
