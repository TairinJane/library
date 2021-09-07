import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TPurchase, TStore } from '../../store/store';
import { PurchasesTable } from './purchases-table';
import { PurchasesThunks } from '../../actions/purchases/purchases.thunks';
import { TLoadableList } from '../../utils/state.utils';
import { PurchaseInfoPopup } from './purchase-info-popup';

export const PurchasesSearchPage = () => {
  const dispatch = useDispatch();

  const { entities: search, isFetching, isLoaded } = useSelector<TStore, TLoadableList<TPurchase>>(
    store => store.purchases.search,
  );
  const [selectedPurchase, setSelectedPurchase] = useState<TPurchase>();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!search.length && !isFetching && !isLoaded) dispatch(PurchasesThunks.getPurchases());
  }, [search, isFetching, isLoaded]);

  const onPurchaseSelect = useCallback(
    (rowIndex: number) => {
      const purchase = search[rowIndex];
      setSelectedPurchase(purchase);
      setOpen(true);
    },
    [search],
  );

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Purchases (Last 6 months)</h1>
      {!!search?.length && isLoaded ? (
        <PurchasesTable purchases={search} onRowClick={onPurchaseSelect} />
      ) : (
        <div className="offset-top-24 text-center">{isFetching ? 'Loading purchases...' : 'No results'}</div>
      )}
      <PurchaseInfoPopup isOpen={isOpen} purchase={selectedPurchase} setOpen={setOpen} />
    </>
  );
};
