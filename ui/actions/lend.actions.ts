import { TBorrowedBook } from '../store/store';
import { createAction, createAsyncAction } from 'typesafe-actions';

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

const returnBook = createAsyncAction('LEND/RETURN_REQ', 'LEND/RETURN_SUCCESS', 'LEND/RETURN_ERROR')<
  number,
  [TBorrowedBook, number],
  number
>();

const clearLendInfo = createAction('LEND/CLEAR_INFO')();

const fetchDueBooks = createAsyncAction('BOOKS/DUE_BOOKS_REQ', 'BOOKS/DUE_BOOKS_SUCCESS', 'BOOKS/DUE_BOOKS_ERROR')<
  [undefined, undefined],
  TBorrowedBook[],
  [undefined, undefined]
>();

export const LendActions = {
  lendBook,
  returnBook,
  clearLendInfo,
  fetchDueBooks,
};
