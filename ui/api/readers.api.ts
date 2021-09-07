import { stringify } from 'query-string';
import { callApi } from '../utils/api.utils';
import { TBorrowedBook, TReader } from '../store/store';

const getReaders = async (firstName?: string, lastName?: string): Promise<TReader[]> => {
  const request = { firstName, lastName };
  return callApi('/readers?' + stringify(request, { skipNull: true, skipEmptyString: true }));
};

const getHistory = async (readerId: number): Promise<TBorrowedBook[]> => {
  return callApi(`/readers/${readerId}/history`);
};

const getReaderInfo = async (readerId: number): Promise<TReader> => {
  return callApi(`/readers/${readerId}`);
};

const addNewReader = async (
  firstName: string,
  lastName: string,
  birthDate: Date,
  patronymic?: string,
): Promise<TReader> => {
  const reader = { firstName, lastName, birthDate: birthDate.toLocaleDateString(), patronymic };
  return callApi('/readers/new?' + stringify(reader, { skipNull: true, skipEmptyString: true }), {
    method: 'POST',
  });
};

const returnBook = async (bookId: number): Promise<TBorrowedBook> => {
  return callApi(`/readers/return/${bookId}`);
};

export const ReadersApi = {
  getReaders,
  getHistory,
  getReaderInfo,
  addNewReader,
  returnBook,
};
