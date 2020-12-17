import { stringify } from 'query-string';
import { toApiURL } from '../utils/api.utils';
import { TBorrowedBook, TReader } from '../store/store';

const getReaders = async (firstName?: string, lastName?: string): Promise<TReader[]> => {
  const request = { firstName, lastName };
  const resp = await fetch(toApiURL('/readers?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  return null;
};

const getHistory = async (readerId: number): Promise<TBorrowedBook[]> => {
  const resp = await fetch(toApiURL(`/readers/${readerId}/history`));
  if (resp.ok) return await resp.json();
  return null;
};

const getReaderInfo = async (readerId: number): Promise<TReader> => {
  const resp = await fetch(toApiURL(`/readers/${readerId}`));
  if (resp.ok) return await resp.json();
  return null;
};

export const ReadersApi = {
  getReaders,
  getHistory,
  getReaderInfo,
};
