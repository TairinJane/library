import { stringify } from 'query-string';
import { toApiURL } from '../utils/api.utils';
import { TBook, TBorrowedBook, TReservedBook } from '../store/store';

const getBooks = async (title?: string, authorFirstName?: string, authorLastName?: string): Promise<TBook[]> => {
  const request = { title, authorFirstName, authorLastName };
  const resp = await fetch(toApiURL('/books?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const lendBook = async (readerId: number, bookId: number, dueDate: Date): Promise<null> => {
  const request = { readerId, bookId, dueDate: dueDate.toLocaleDateString() };
  const resp = await fetch(toApiURL('/books/lend?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const fetchDueBooks = async (): Promise<TBorrowedBook[]> => {
  const resp = await fetch(toApiURL(`/books/due`));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const getBookInfo = async (bookId: number): Promise<TBook> => {
  const resp = await fetch(toApiURL(`/books/${bookId}`));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const getHistory = async (booksId: number): Promise<TBorrowedBook[]> => {
  const resp = await fetch(toApiURL(`/books/${booksId}/history`));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const getReserved = async (booksId: number): Promise<TReservedBook[]> => {
  const resp = await fetch(toApiURL(`/books/${booksId}/reserved`));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

export const BooksApi = {
  getBooks,
  lendBook,
  fetchDueBooks,
  getBookInfo,
  getHistory,
  getReserved,
};
