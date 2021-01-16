import { ActionType, getType } from 'typesafe-actions';
import { authorsStoreDefaults, TAuthorsStore } from '../store/store';
import produce from 'immer';
import { AuthorsActions } from '../actions/authors/authors.actions';
import { TLoadableState } from '../utils/state.utils';

type TAuthorsActions = ActionType<typeof AuthorsActions>;

export const authorsReducer = (state = authorsStoreDefaults, action: TAuthorsActions): TAuthorsStore => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(AuthorsActions.findAuthors.request):
        draft.search = { ...TLoadableState.REQUEST, entities: [] };
        break;
      case getType(AuthorsActions.findAuthors.success):
        draft.search = { ...TLoadableState.SUCCESS, entities: action.payload };
        break;
      case getType(AuthorsActions.findAuthors.failure):
        draft.search = { ...state.search, ...TLoadableState.ERROR };
        break;
      case getType(AuthorsActions.getAuthorInfo.request):
      case getType(AuthorsActions.getBooks.request):
        draft.profiles[action.payload] = { ...draft.profiles[action.payload], ...TLoadableState.REQUEST };
        break;
      case getType(AuthorsActions.getBooks.success):
        draft.profiles[action.meta] = {
          ...draft.profiles[action.meta],
          ...TLoadableState.SUCCESS,
          books: action.payload,
        };
        break;
      case getType(AuthorsActions.getAuthorInfo.failure):
      case getType(AuthorsActions.getBooks.failure):
        draft.profiles[action.payload] = { ...draft.profiles[action.payload], ...TLoadableState.ERROR };
        break;
      case getType(AuthorsActions.getAuthorInfo.success):
        draft.profiles[action.meta] = {
          ...draft.profiles[action.meta],
          ...TLoadableState.SUCCESS,
          author: action.payload,
        };
        break;
      case getType(AuthorsActions.newAuthor.request):
        draft.add = TLoadableState.REQUEST;
        break;
      case getType(AuthorsActions.newAuthor.success):
        draft.add = TLoadableState.SUCCESS;
        break;
      case getType(AuthorsActions.newAuthor.failure):
        draft.add = TLoadableState.ERROR;
        break;
      case getType(AuthorsActions.saveAuthorInfo):
        draft.profiles[action.payload.id] = { ...TLoadableState.DEFAULT, author: action.payload };
    }
  });
};
