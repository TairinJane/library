import { ActionType, getType } from 'typesafe-actions';
import { readersStoreDefaults, TReadersStore } from '../store/store';
import produce from 'immer';
import { ReadersActions } from '../actions/readers/readers.actions';
import { TLoadableState } from '../utils/state.utils';

type TReadersActions = ActionType<typeof ReadersActions>;

export const readersReducer = (state = readersStoreDefaults, action: TReadersActions): TReadersStore => {
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
      case getType(ReadersActions.findReaders.request):
        draft.search = { ...TLoadableState.REQUEST, entities: [] };
        break;
      case getType(ReadersActions.findReaders.success):
        draft.search = { ...TLoadableState.SUCCESS, entities: action.payload };
        break;
      case getType(ReadersActions.findReaders.failure):
        draft.search = { ...TLoadableState.ERROR, entities: [] };
        break;
      case getType(ReadersActions.returnBook.request):
        break;
      case getType(ReadersActions.returnBook.success):
        const readerId = action.payload.reader.id;
        if (draft.profiles[readerId])
          draft.profiles[readerId].history = draft.profiles[readerId].history.map(book =>
            book.id == action.meta ? action.payload : book,
          );
        break;
      case getType(ReadersActions.returnBook.failure):
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
