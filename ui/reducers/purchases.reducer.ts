import { ActionType, getType } from 'typesafe-actions';
import { purchasesStoreDefaults, TPurchasesStore } from '../store/store';
import produce from 'immer';
import { PurchasesActions } from '../actions/purchases.actions';
import { TLoadableState } from '../utils/state.utils';

type TPurchasesActions = ActionType<typeof PurchasesActions>;

export const purchasesReducer = (state = purchasesStoreDefaults, action: TPurchasesActions): TPurchasesStore => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(PurchasesActions.getPurchases.request):
        draft.search = { ...TLoadableState.REQUEST, entities: [] };
        break;
      case getType(PurchasesActions.getPurchases.success):
        draft.search = { ...TLoadableState.SUCCESS, entities: action.payload };
        break;
      case getType(PurchasesActions.getPurchases.failure):
        draft.search = { ...state.search, ...TLoadableState.ERROR };
        break;
      case getType(PurchasesActions.newPurchase.request):
        draft.add = TLoadableState.REQUEST;
        break;
      case getType(PurchasesActions.newPurchase.success):
        if (!!state.search.entities?.length) {
          const index = draft.search.entities.findIndex(
            purchase => purchase.deliveryDate < action.payload.deliveryDate,
          );
          if (index != -1) draft.search.entities.splice(index, 0, action.payload);
          else draft.search.entities.push(action.payload);
        }
        draft.add = TLoadableState.SUCCESS;
        break;
      case getType(PurchasesActions.newPurchase.failure):
        draft.add = TLoadableState.ERROR;
        break;
    }
  });
};
