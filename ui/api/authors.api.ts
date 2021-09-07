import { TAuthor, TBook } from '../store/store';
import { callApi } from '../utils/api.utils';
import { stringify } from 'query-string';

const getAuthors = async (firstName?: string, lastName?: string): Promise<TAuthor[]> => {
  const request = { firstName, lastName };
  return callApi('/authors?' + stringify(request, { skipNull: true, skipEmptyString: true }));
};

const newAuthor = async (author: TAuthor): Promise<TAuthor> => {
  return callApi('/authors/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(author),
  });
};

const getAuthorInfo = async (authorId: number): Promise<TAuthor> => {
  return callApi(`/authors/${authorId}`);
};

const getBooks = async (authorId: number): Promise<TBook[]> => {
  return callApi(`/authors/${authorId}/books`);
};

export const AuthorsApi = {
  getAuthors,
  newAuthor,
  getAuthorInfo,
  getBooks,
};
