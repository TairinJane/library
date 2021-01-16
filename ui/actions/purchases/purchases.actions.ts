import { createAsyncAction } from 'typesafe-actions';
import { TPurchase } from '../../store/store';

const getPurchases = createAsyncAction('PURCHASES/SEARCH_REQ', 'PURCHASES/SEARCH_SUCCESS', 'PURCHASES/SEARCH_ERROR')<
  [undefined, undefined],
  TPurchase[],
  [undefined, undefined]
>();

const newPurchase = createAsyncAction('PURCHASES/NEW_REQ', 'PURCHASES/NEW_SUCCESS', 'PURCHASES/NEW_ERROR')<
  TPurchase,
  TPurchase,
  [undefined, undefined]
>();

export const PurchasesActions = {
  getPurchases,
  newPurchase,
};
