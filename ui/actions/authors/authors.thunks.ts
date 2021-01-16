import { Dispatch } from 'redux';
import { AuthorsActions } from './authors.actions';
import { AuthorsApi } from '../../api/authors.api';
import { TAuthor } from '../../store/store';

const findAuthors = (firstName?: string, lastName?: string) => {
  return (dispatch: Dispatch) => {
    const meta = { firstName, lastName };
    dispatch(AuthorsActions.findAuthors.request(undefined, meta));
    return AuthorsApi.getAuthors(firstName, lastName)
      .then(json => dispatch(AuthorsActions.findAuthors.success(json, meta)))
      .catch(() => dispatch(AuthorsActions.findAuthors.failure(undefined, meta)));
  };
};

const newAuthor = (author: TAuthor) => {
  return (dispatch: Dispatch) => {
    dispatch(AuthorsActions.newAuthor.request(author));
    return AuthorsApi.newAuthor(author)
      .then(json => dispatch(AuthorsActions.newAuthor.success(json)))
      .catch(() => dispatch(AuthorsActions.newAuthor.failure()));
  };
};

const getAuthorInfo = (authorId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(AuthorsActions.getAuthorInfo.request(authorId));
    return AuthorsApi.getAuthorInfo(authorId)
      .then(json => dispatch(AuthorsActions.getAuthorInfo.success(json, authorId)))
      .catch(() => dispatch(AuthorsActions.getAuthorInfo.failure(authorId)));
  };
};

const getAuthorBooks = (authorId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(AuthorsActions.getBooks.request(authorId));
    return AuthorsApi.getBooks(authorId)
      .then(json => dispatch(AuthorsActions.getBooks.success(json, authorId)))
      .catch(() => dispatch(AuthorsActions.getBooks.failure(authorId)));
  };
};

export const AuthorsThunks = {
  findAuthors,
  newAuthor,
  getAuthorInfo,
  getAuthorBooks,
};
