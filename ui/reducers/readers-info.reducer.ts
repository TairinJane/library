import { ActionType, getType } from 'typesafe-actions';
import { readersInfoDefaults, TReadersInfo } from '../store/store';
import produce from 'immer';
import { ReadersActions } from '../actions/readers.actions';

type TReadersActions = ActionType<typeof ReadersActions>;

export const readersInfoReducer = (state = readersInfoDefaults, action: TReadersActions): TReadersInfo => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(ReadersActions.saveReaderInfo):
        draft[action.payload.id] = action.payload;
        break;
    }
  });
};
