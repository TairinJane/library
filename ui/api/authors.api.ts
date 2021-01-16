import { TAuthor, TBook } from '../store/store';
import { toApiURL } from '../utils/api.utils';
import { stringify } from 'query-string';

const getAuthors = async (firstName?: string, lastName?: string): Promise<TAuthor[]> => {
  const request = { firstName, lastName };
  const resp = await fetch(toApiURL('/authors?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  return null;
};

const newAuthor = async (author: TAuthor): Promise<TAuthor> => {
  const resp = await fetch(toApiURL('/authors/new'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(author),
  });
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const getAuthorInfo = async (authorId: number): Promise<TAuthor> => {
  const resp = await fetch(toApiURL(`/authors/${authorId}`));
  if (resp.ok) return await resp.json();
  return null;
};

const getBooks = async (authorId: number): Promise<TBook[]> => {
  const resp = await fetch(toApiURL(`/authors/${authorId}/books`));
  if (resp.ok) return await resp.json();
  return null;
};

export const AuthorsApi = {
  getAuthors,
  newAuthor,
  getAuthorInfo,
  getBooks,
};
