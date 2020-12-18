import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TPurchase, TStore } from '../../store/store';
import { PurchasesTable } from './purchases-table';
import { SearchThunks } from '../../actions/search.thunks';

export const PurchasesSearchPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const purchases = useSelector<TStore, TPurchase[]>(store => store.search.purchases) || [];

  useEffect(() => {
    if (!purchases.length) dispatch(SearchThunks.getPurchases());
  }, [purchases]);

  const onPurchaseSelect = useCallback(
    (rowIndex: number) => {
      const purchase = purchases[rowIndex];
      console.log(purchase.purchaseDate, purchase.supplier);
      /*dispatch(ReadersActions.saveReaderInfo(reader));
      history.push(`/reader/${reader.id}`);*/
    },
    [purchases],
  );

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Purchases (Last Half of Year)</h1>
      {!!purchases?.length ? (
        <PurchasesTable purchases={purchases} onRowClick={onPurchaseSelect} />
      ) : (
        <div className="offset-top-24 text-center">No results</div>
      )}
    </>
  );
};
