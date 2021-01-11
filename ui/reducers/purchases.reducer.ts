import { ActionType, getType } from 'typesafe-actions';
import { purchasesStoreDefaults, TPurchasesStore } from '../store/store';
import produce from 'immer';
import { PurchasesActions } from '../actions/purchases.actions';

type TSearchActions = ActionType<typeof PurchasesActions>;

export const purchasesReducer = (state = purchasesStoreDefaults, action: TSearchActions): TPurchasesStore => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(PurchasesActions.getPurchases.request):
        draft.isFetching = true;
        draft.purchases = [];
        break;
      case getType(PurchasesActions.getPurchases.success):
        draft.purchases = action.payload;
        draft.isFetching = false;
        draft.isLoaded = true;
        break;
      case getType(PurchasesActions.getPurchases.failure):
        draft.isFetching = false;
        draft.isError = true;
        break;
    }
  });
};
