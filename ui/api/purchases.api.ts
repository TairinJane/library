import { toApiURL } from '../utils/api.utils';
import { TPurchase } from '../store/store';

const getPurchases = async (): Promise<TPurchase[]> => {
  const resp = await fetch(toApiURL('/purchases'));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const newPurchase = async (purchase: TPurchase): Promise<TPurchase> => {
  const resp = await fetch(toApiURL('/purchases/new'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(purchase),
  });
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

export const PurchasesApi = {
  getPurchases,
  newPurchase,
};
