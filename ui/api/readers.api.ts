import { stringify } from 'query-string';
import { toApiURL, toServerURL } from '../utils/api.utils';

const getReaders = async (firstName?: string, lastName?: string): Promise<any> => {
  const request = { firstName, lastName };
  const resp = await fetch(toApiURL('/readers?') + stringify(request, { skipNull: true, skipEmptyString: true }));
  if (resp.ok) return await resp.json();
  return null;
};

export const ReadersApi = {
  getReaders,
};
