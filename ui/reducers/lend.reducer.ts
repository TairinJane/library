import { ActionType, getType } from 'typesafe-actions';
import { TLend } from '../store/store';
import produce from 'immer';
import { LendActions } from '../actions/lend.actions';

const stateSearchDefaults: TLend = {};
type TLendActions = ActionType<typeof LendActions>;

export const lendReducer = (state = stateSearchDefaults, action: TLendActions): TLend => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(LendActions.pickReader):
        draft.reader = action.payload;
        break;
      case getType(LendActions.pickBook):
        draft.book = action.payload;
        break;
    }
  });
};
