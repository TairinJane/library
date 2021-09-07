import { callApi } from '../utils/api.utils';
import { TPurchase } from '../store/store';

const getPurchases = async (): Promise<TPurchase[]> => {
  return callApi('/purchases');
};

const newPurchase = async (purchase: TPurchase): Promise<TPurchase> => {
  return callApi('/purchases/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(purchase),
  });
};

export const PurchasesApi = {
  getPurchases,
  newPurchase,
};
