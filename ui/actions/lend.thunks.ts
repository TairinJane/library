import { Dispatch } from 'redux';
import { LendActions } from './lend.actions';
import { LendApi } from '../api/lend.api';

const lendBook = (readerId: number, bookId: number, employeeId = 30) => {
  return (dispatch: Dispatch) => {
    const payload = { readerId, bookId, employeeId };
    dispatch(LendActions.lendBook.request(payload));
    return LendApi.lendBook(readerId, bookId, employeeId)
      .then(() => dispatch(LendActions.lendBook.success(payload)))
      .catch(() => dispatch(LendActions.lendBook.failure(payload)));
  };
};

export const LendThunks = {
  lendBook,
};
