import { createAsyncAction } from 'typesafe-actions';
import { TPurchase } from '../store/store';

const getPurchases = createAsyncAction('PURCHASES/SEARCH_REQ', 'PURCHASES/SEARCH_SUCCESS', 'PURCHASES/SEARCH_ERROR')<
  [undefined, undefined],
  TPurchase[],
  [undefined, undefined]
>();

export const PurchasesActions = {
  getPurchases,
};
