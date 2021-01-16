import { createAction, createAsyncAction } from 'typesafe-actions';
import { TAuthor, TBook } from '../../store/store';

type TAuthorsMeta = { firstName?: string; lastName?: string };

const findAuthors = createAsyncAction(
  'AUTHORS/GET_AUTHORS_REQ',
  'AUTHORS/GET_AUTHORS_SUCCESS',
  'AUTHORS/GET_AUTHORS_ERROR',
)<[undefined, TAuthorsMeta], [TAuthor[], TAuthorsMeta], [undefined, TAuthorsMeta]>();

const newAuthor = createAsyncAction('AUTHORS/NEW_REQ', 'AUTHORS/NEW_SUCCESS', 'AUTHORS/NEW_ERROR')<
  TAuthor,
  TAuthor,
  [undefined, undefined]
>();

const getBooks = createAsyncAction('AUTHORS/GET_BOOKS_REQ', 'AUTHORS/GET_BOOKS_SUCCESS', 'AUTHORS/GET_BOOKS_ERROR')<
  number,
  [TBook[], number],
  number
>();

const getAuthorInfo = createAsyncAction('AUTHORS/GET_INFO_REQ', 'AUTHORS/GET_INFO_SUCCESS', 'AUTHORS/GET_INFO_ERROR')<
  number,
  [TAuthor, number],
  number
>();

const saveAuthorInfo = createAction('AUTHORS/SAVE_AUTHOR_INFO')<TAuthor>();

export const AuthorsActions = {
  findAuthors,
  newAuthor,
  getBooks,
  getAuthorInfo,
  saveAuthorInfo,
};
