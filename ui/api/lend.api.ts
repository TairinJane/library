import { stringify } from 'query-string';
import { toApiURL } from '../utils/api.utils';

const lendBook = async (readerId: number, bookId: number, employeeId = 30): Promise<any> => {
  const request = { readerId, bookId, employeeId };
  const resp = await fetch(toApiURL('/lend?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  return null;
};

export const LendApi = {
  lendBook,
};