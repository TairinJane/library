import { createAction, createAsyncAction } from 'typesafe-actions';
import { TBook, TBorrowedBook, TReservedBook } from '../../store/store';

type TBooksMeta = { title?: string; authorFirstName?: string; authorLastName?: string };

const findBooks = createAsyncAction('BOOKS/GET_BOOKS_REQ', 'BOOKS/GET_BOOKS_SUCCESS', 'BOOKS/GET_BOOKS_ERROR')<
  [undefined, TBooksMeta],
  [TBook[], TBooksMeta],
  [undefined, TBooksMeta]
>();

type TLendPayload = {
  readerId: number;
  bookId: number;
  dueDate: Date;
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

const getBookInfo = createAsyncAction('BOOKS/GET_INFO_REQ', 'BOOKS/GET_INFO_SUCCESS', 'BOOKS/GET_INFO_ERROR')<
  number,
  [TBook, number],
  number
>();

const getHistory = createAsyncAction('BOOKS/GET_HISTORY_REQ', 'BOOKS/GET_HISTORY_SUCCESS', 'BOOKS/GET_HISTORY_ERROR')<
  number,
  [TBorrowedBook[], number],
  number
>();

const getReserved = createAsyncAction(
  'BOOKS/GET_RESERVED_REQ',
  'BOOKS/GET_RESERVED_SUCCESS',
  'BOOKS/GET_RESERVED_ERROR',
)<number, [TReservedBook[], number], number>();

const saveBookInfo = createAction('BOOKS/SAVE_AUTHOR_INFO')<TBook>();

export const BookActions = {
  findBooks,
  lendBook,
  clearLendInfo,
  fetchDueBooks,
  getBookInfo,
  getHistory,
  getReserved,
  saveBookInfo,
};
