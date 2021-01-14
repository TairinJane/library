import { ActionType, getType } from 'typesafe-actions';
import { purchasesStoreDefaults, TPurchasesStore } from '../store/store';
import produce from 'immer';
import { PurchasesActions } from '../actions/purchases.actions';

type TSearchActions = ActionType<typeof PurchasesActions>;

export const purchasesReducer = (state = purchasesStoreDefaults, action: TSearchActions): TPurchasesStore => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(PurchasesActions.getPurchases.request):
        draft.search.isFetching = true;
        draft.search.entities = [];
        break;
      case getType(PurchasesActions.getPurchases.success):
        draft.search.entities = action.payload;
        draft.search.isFetching = false;
        draft.search.isLoaded = true;
        break;
      case getType(PurchasesActions.getPurchases.failure):
        draft.search.isFetching = false;
        draft.search.isError = true;
        break;
    }
  });
};
