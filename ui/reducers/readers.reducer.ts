import { ActionType, getType } from 'typesafe-actions';
import { storeReadersDefaults, TStoreReaders } from '../store/store';
import produce from 'immer';
import { ReadersActions } from '../actions/readers.actions';
import { LendActions } from '../actions/lend.actions';
import { TLoadableState } from '../utils/state.utils';

type TReadersActions = ActionType<typeof ReadersActions> | ActionType<typeof LendActions>;

export const readersReducer = (state = storeReadersDefaults, action: TReadersActions): TStoreReaders => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(ReadersActions.saveReaderInfo):
        draft.profiles[action.payload.id] = { ...draft.profiles[action.payload.id], reader: action.payload };
        break;
      case getType(ReadersActions.getHistory.request):
        if (!draft.profiles[action.payload]) draft.profiles[action.payload] = {};
        break;
      case getType(ReadersActions.getHistory.success):
        draft.profiles[action.meta] = { ...draft.profiles[action.meta], history: action.payload };
        break;
      case getType(ReadersActions.getHistory.failure):
        break;
      case getType(ReadersActions.getReaderInfo.request):
        if (!draft.profiles[action.payload]) draft.profiles[action.payload] = {};
        break;
      case getType(ReadersActions.getReaderInfo.success):
        draft.profiles[action.meta] = { ...draft.profiles[action.meta], reader: action.payload };
        break;
      case getType(ReadersActions.getReaderInfo.failure):
        break;
      case getType(LendActions.returnBook.request):
        break;
      case getType(LendActions.returnBook.success):
        const readerId = action.payload.reader.id;
        if (draft.profiles[readerId])
          draft.profiles[readerId].history = draft.profiles[readerId].history.map(book =>
            book.id === action.meta ? action.payload : book,
          );
        break;
      case getType(LendActions.returnBook.failure):
        break;
      case getType(ReadersActions.addNewReader.request):
        draft.add.isFetching = true;
        break;
      case getType(ReadersActions.addNewReader.success):
        draft.add.isFetching = false;
        draft.add.isLoaded = true;
        break;
      case getType(ReadersActions.addNewReader.failure):
        draft.add.isFetching = false;
        draft.add.isError = true;
        break;
      case getType(ReadersActions.addStateToDefault):
        draft.add = TLoadableState.DEFAULT;
        break;
    }
  });
};
