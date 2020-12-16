import { TBook, TReader } from '../store/store';
import { createAction, createAsyncAction } from 'typesafe-actions';

const pickReader = createAction('LEND/PICK_READER')<TReader>();
const pickBook = createAction('LEND/PICK_Book')<TBook>();

type TLendPayload = {
  readerId: number;
  bookId: number;
  employeeId: number;
};

const lendBook = createAsyncAction('LEND/LEND_REQ', 'LEND/LEND_SUCCESS', 'LEND/LEND_ERROR')<
  TLendPayload,
  TLendPayload,
  TLendPayload
>();

export const LendActions = {
  pickReader,
  pickBook,
  lendBook,
};
