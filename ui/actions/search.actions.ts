import { createAction, createAsyncAction } from 'typesafe-actions';
import { TPurchase } from '../store/store';

const clearSearch = createAction('SEARCH/CLEAR_SEARCH')();

const getPurchases = createAsyncAction('SEARCH/PURCHASES_REQ', 'READERS/PURCHASES_SUCCESS', 'READERS/PURCHASES_ERROR')<
  [undefined, undefined],
  TPurchase[],
  [undefined, undefined]
>();

export const SearchActions = {
  clearSearch,
  getPurchases,
};
