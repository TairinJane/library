import { stringify } from 'query-string';
import { callApi } from '../utils/api.utils';
import { TBook, TBorrowedBook, TReservedBook } from '../store/store';

const getBooks = async (title?: string, authorFirstName?: string, authorLastName?: string): Promise<TBook[]> => {
  const request = { title, authorFirstName, authorLastName };
  return callApi('/books?' + stringify(request, { skipNull: true, skipEmptyString: true }));
};

const lendBook = async (readerId: number, bookId: number, dueDate: Date): Promise<null> => {
  const request = { readerId, bookId, dueDate: dueDate.toLocaleDateString() };
  return callApi('/books/lend?' + stringify(request, { skipNull: true, skipEmptyString: true }));
};

const fetchDueBooks = async (): Promise<TBorrowedBook[]> => {
  return callApi(`/books/due`);
};

const getBookInfo = async (bookId: number): Promise<TBook> => {
  return callApi(`/books/${bookId}`);
};

const getHistory = async (booksId: number): Promise<TBorrowedBook[]> => {
  return callApi(`/books/${booksId}/history`);
};

const getReserved = async (booksId: number): Promise<TReservedBook[]> => {
  return callApi(`/books/${booksId}/reserved`);
};

export const BooksApi = {
  getBooks,
  lendBook,
  fetchDueBooks,
  getBookInfo,
  getHistory,
  getReserved,
};
