import { toApiURL } from '../utils/api.utils';
import { TPurchase } from '../store/store';

const getPurchases = async (): Promise<TPurchase[]> => {
  const resp = await fetch(toApiURL('/purchases'));
  if (resp.ok) return await resp.json();
  return null;
};

export const PurchasesApi = {
  getPurchases,
};
