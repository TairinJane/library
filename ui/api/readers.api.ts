import { stringify } from 'query-string';
import { toApiURL } from '../utils/api.utils';
import { TBorrowedBook, TReader } from '../store/store';

const getReaders = async (firstName?: string, lastName?: string): Promise<TReader[]> => {
  const request = { firstName, lastName };
  const resp = await fetch(toApiURL('/readers?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const getHistory = async (readerId: number): Promise<TBorrowedBook[]> => {
  const resp = await fetch(toApiURL(`/readers/${readerId}/history`));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const getReaderInfo = async (readerId: number): Promise<TReader> => {
  const resp = await fetch(toApiURL(`/readers/${readerId}`));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const addNewReader = async (
  firstName: string,
  lastName: string,
  birthDate: Date,
  patronymic?: string,
): Promise<TReader> => {
  const reader = { firstName, lastName, birthDate: birthDate.toLocaleDateString(), patronymic };
  const resp = await fetch(toApiURL('/readers/new?' + stringify(reader, { skipNull: true, skipEmptyString: true })), {
    method: 'POST',
  });
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const returnBook = async (bookId: number): Promise<TBorrowedBook> => {
  const resp = await fetch(toApiURL(`/readers/return/${bookId}`));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

export const ReadersApi = {
  getReaders,
  getHistory,
  getReaderInfo,
  addNewReader,
  returnBook,
};
