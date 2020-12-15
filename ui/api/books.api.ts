import { stringify } from 'query-string';
import { toServerURL } from '../utils/api.utils';

const getBooks = async (title?: string, authorFirstName?: string, authorLastName?: string): Promise<any> => {
  const request = { title, authorFirstName, authorLastName };
  const resp = await fetch(toServerURL('/books?') + stringify(request, { skipNull: true }));
  if (resp.ok) return await resp.json();
  return null;
};

export const BooksApi = {
  getBooks,
};
