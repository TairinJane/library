import { Dispatch } from 'redux';
import { LendActions } from './lend.actions';
import { LendApi } from '../api/lend.api';

const lendBook = (readerId: number, bookId: number, employeeId = 30) => {
  return (dispatch: Dispatch) => {
    const payload = { readerId, bookId, employeeId };
    dispatch(LendActions.lendBook.request(payload));
    return LendApi.lendBook(readerId, bookId, employeeId)
      .then(json => dispatch(LendActions.lendBook.success(json, payload)))
      .catch(() => dispatch(LendActions.lendBook.failure(payload)));
  };
};

const returnBook = (bookId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(LendActions.returnBook.request(bookId));
    return LendApi.returnBook(bookId)
      .then(json => dispatch(LendActions.returnBook.success(json, bookId)))
      .catch(() => dispatch(LendActions.returnBook.failure(bookId)));
  };
};

export const LendThunks = {
  lendBook,
  returnBook,
};
