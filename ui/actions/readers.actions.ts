import { TBorrowedBook, TReader } from '../store/store';
import { createAction, createAsyncAction } from 'typesafe-actions';

type TReadersMeta = { firstName?: string; lastName?: string };

const findReaders = createAsyncAction(
  'READERS/GET_READERS_REQ',
  'READERS/GET_READERS_SUCCESS',
  'READERS/GET_READERS_ERROR',
)<[undefined, TReadersMeta], [TReader[], TReadersMeta], [undefined, TReadersMeta]>();

const getHistory = createAsyncAction(
  'READERS/GET_HISTORY_REQ',
  'READERS/GET_HISTORY_SUCCESS',
  'READERS/GET_HISTORY_ERROR',
)<number, [TBorrowedBook[], number], number>();

const getReaderInfo = createAsyncAction('READERS/GET_INFO_REQ', 'READERS/GET_INFO_SUCCESS', 'READERS/GET_INFO_ERROR')<
  number,
  [TReader, number],
  number
>();

const saveReaderInfo = createAction('READERS/SAVE_READER_INFO')<TReader>();

const addNewReader = createAsyncAction(
  'READERS/ADD_READER_REQ',
  'READERS/ADD_READER_SUCCESS',
  'READERS/ADD_READER_ERROR',
)<[undefined, undefined], TReader, [undefined, undefined]>();

const returnBook = createAsyncAction('READERS/RETURN_REQ', 'READERS/RETURN_SUCCESS', 'READERS/RETURN_ERROR')<
  number,
  [TBorrowedBook, number],
  number
>();

const addStateToDefault = createAction('READERS/ADD_READER_DEFAULT')();

export const ReadersActions = {
  findReaders,
  saveReaderInfo,
  getHistory,
  getReaderInfo,
  returnBook,
  addNewReader,
  addStateToDefault,
};
