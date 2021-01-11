import { stringify } from 'query-string';
import { toApiURL } from '../utils/api.utils';
import { TBook, TBorrowedBook } from '../store/store';

const getBooks = async (title?: string, authorFirstName?: string, authorLastName?: string): Promise<TBook[]> => {
  const request = { title, authorFirstName, authorLastName };
  const resp = await fetch(toApiURL('/books?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  return null;
};

const lendBook = async (readerId: number, bookId: number, employeeId = 30): Promise<null> => {
  const request = { readerId, bookId, employeeId };
  const resp = await fetch(toApiURL('/books/lend?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  return null;
};

const fetchDueBooks = async (): Promise<TBorrowedBook[]> => {
  const resp = await fetch(toApiURL(`/books/due`));
  if (resp.ok) return await resp.json();
  return null;
};

export const BooksApi = {
  getBooks,
  lendBook,
  fetchDueBooks,
};
