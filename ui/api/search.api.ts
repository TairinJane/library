import { toApiURL } from '../utils/api.utils';

const getPurchases = async (): Promise<any> => {
  const resp = await fetch(toApiURL('/purchases'));
  if (resp.ok) return await resp.json();
  return null;
};

export const SearchApi = {
  getPurchases,
};
