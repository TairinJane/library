import { Dispatch } from 'redux';
import { PurchasesApi } from '../api/purchases.api';
import { PurchasesActions } from './purchases.actions';

const getPurchases = () => {
  return (dispatch: Dispatch) => {
    dispatch(PurchasesActions.getPurchases.request());
    return PurchasesApi.getPurchases()
      .then(json => dispatch(PurchasesActions.getPurchases.success(json)))
      .catch(() => dispatch(PurchasesActions.getPurchases.failure()));
  };
};

export const PurchasesThunks = {
  getPurchases,
};
