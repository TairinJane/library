import { Dispatch } from 'redux';
import { PurchasesApi } from '../../api/purchases.api';
import { PurchasesActions } from './purchases.actions';
import { TPurchase } from '../../store/store';

const getPurchases = () => {
  return (dispatch: Dispatch) => {
    dispatch(PurchasesActions.getPurchases.request());
    return PurchasesApi.getPurchases()
      .then(json => dispatch(PurchasesActions.getPurchases.success(json)))
      .catch(() => dispatch(PurchasesActions.getPurchases.failure()));
  };
};

const newPurchase = (purchase: TPurchase) => {
  return (dispatch: Dispatch) => {
    dispatch(PurchasesActions.newPurchase.request(purchase));
    return PurchasesApi.newPurchase(purchase)
      .then(json => dispatch(PurchasesActions.newPurchase.success(json)))
      .catch(() => dispatch(PurchasesActions.newPurchase.failure()));
  };
};

export const PurchasesThunks = {
  getPurchases,
  newPurchase,
};
