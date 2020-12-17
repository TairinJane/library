import { ActionType, getType } from 'typesafe-actions';
import { TLend } from '../store/store';
import produce from 'immer';
import { LendActions } from '../actions/lend.actions';

const stateSearchDefaults: TLend = {};
type TLendActions = ActionType<typeof LendActions>;

export const lendReducer = (state = stateSearchDefaults, action: TLendActions): TLend => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(LendActions.lendBook.request):
        draft = { ...action.payload };
        break;
      case getType(LendActions.lendBook.success):
        draft.bookId = action.payload.book.id;
        draft.readerId = action.payload.reader.id;
        draft.isSuccess = true;
        break;
      case getType(LendActions.lendBook.failure):
        draft.bookId = action.payload.bookId;
        draft.readerId = action.payload.readerId;
        draft.isSuccess = false;
        break;
      case getType(LendActions.clearLendInfo):
        draft = { isSuccess: false };
    }
  });
};
