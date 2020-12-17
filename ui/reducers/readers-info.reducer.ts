import { ActionType, getType } from 'typesafe-actions';
import { readersInfoDefaults, TReadersProfiles } from '../store/store';
import produce from 'immer';
import { ReadersActions } from '../actions/readers.actions';
import { LendActions } from '../actions/lend.actions';

type TReadersActions = ActionType<typeof ReadersActions> | ActionType<typeof LendActions>;

export const readersInfoReducer = (state = readersInfoDefaults, action: TReadersActions): TReadersProfiles => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(ReadersActions.saveReaderInfo):
        if (!draft[action.payload.id]) draft[action.payload.id] = { reader: action.payload };
        break;
      case getType(ReadersActions.getHistory.request):
        break;
      case getType(ReadersActions.getHistory.success):
        if (!draft[action.meta]?.history) draft[action.meta] = { ...draft[action.meta], history: action.payload };
        break;
      case getType(ReadersActions.getHistory.failure):
        break;
      case getType(ReadersActions.getReaderInfo.request):
        break;
      case getType(ReadersActions.getReaderInfo.success):
        if (!draft[action.meta]?.reader) draft[action.meta] = { ...draft[action.meta], reader: action.payload };
        break;
      case getType(ReadersActions.getReaderInfo.failure):
        break;
      case getType(LendActions.returnBook.request):
        break;
      case getType(LendActions.returnBook.success):
        const readerId = action.payload.reader.id;
        if (draft[readerId])
          draft[readerId].history = draft[readerId].history.map(book =>
            book.id === action.meta ? action.payload : book,
          );
        break;
      case getType(LendActions.returnBook.failure):
        break;
    }
  });
};
