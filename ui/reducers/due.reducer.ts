import { ActionType, getType } from 'typesafe-actions';
import { dueBooksDefaults, TDueBooks } from '../store/store';
import produce from 'immer';
import { LendActions } from '../actions/lend.actions';

type TLendActions = ActionType<typeof LendActions>;

export const dueReducer = (state = dueBooksDefaults, action: TLendActions): TDueBooks => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(LendActions.fetchDueBooks.request):
        draft.isFetching = true;
        break;
      case getType(LendActions.fetchDueBooks.success):
        draft.books = action.payload;
        draft.isFetching = false;
        break;
      case getType(LendActions.fetchDueBooks.failure):
        draft.isFetching = false;
        draft.isError = true;
        break;
    }
  });
};
