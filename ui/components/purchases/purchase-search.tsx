import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TPurchase, TStore } from '../../store/store';
import { PurchasesTable } from './purchases-table';
import { PurchasesThunks } from '../../actions/purchases.thunks';
import { Alert } from '@blueprintjs/core';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { TLoadableList } from '../../utils/state.utils';

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

  const onConfirm = useCallback(() => {
    setOpen(false);
  }, [selectedPurchase]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Purchases (Last Half of Year)</h1>
      {!!search?.length && isLoaded ? (
        <PurchasesTable purchases={search} onRowClick={onPurchaseSelect} />
      ) : (
        <div className="offset-top-24 text-center">{isFetching ? 'Loading purchases...' : 'No results'}</div>
      )}
      <Alert confirmButtonText="Ok" isOpen={isOpen} onConfirm={onConfirm} canOutsideClickCancel>
        <h5 className="bp3-heading offset-bottom-24">Purchase {selectedPurchase?.id}</h5>
        <p>{selectedPurchase?.supplier ?? ''}</p>
        <p>Purchase Date: {selectedPurchase?.purchaseDate ?? ''}</p>
        <p>Delivery Date: {selectedPurchase?.deliveryDate ?? ''}</p>
        <p className="text-bold">Books</p>
        <Table
          numRows={selectedPurchase?.books?.length}
          className="offset-top-12 alert-table"
          enableRowResizing={false}
          selectionModes={SelectionModes.ROWS_AND_CELLS}
        >
          <Column name={'ISBN'} cellRenderer={rowIndex => <Cell>{selectedPurchase?.books[rowIndex].isbn}</Cell>} />
          <Column name={'Amount'} cellRenderer={rowIndex => <Cell>{selectedPurchase?.books[rowIndex].amount}</Cell>} />
        </Table>
      </Alert>
    </>
  );
};
