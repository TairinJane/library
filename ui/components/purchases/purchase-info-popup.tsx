import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { Alert } from '@blueprintjs/core';
import React from 'react';
import { TPurchase } from '../../store/store';

type Props = {
  purchase: TPurchase;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const PurchaseInfoPopup = ({ isOpen, purchase, setOpen }: Props) => (
  <Alert isOpen={isOpen} onClose={() => setOpen(false)} canOutsideClickCancel>
    <h4 className="bp3-heading">Purchase {purchase?.id}</h4>
    <div className="offset-top-12">
      <span className="text-bold">Supplier: </span>
      {purchase?.supplier ?? ''}
    </div>
    <div>
      <span className="text-bold">Purchase Date:</span> {purchase?.purchaseDate ?? ''}
    </div>
    <div>
      <span className="text-bold">Delivery Date:</span> {purchase?.deliveryDate ?? ''}
    </div>
    <h5 className="bp3-heading offset-top-12">Books</h5>
    <Table
      numRows={purchase?.books?.length}
      className="offset-top-12 alert-table"
      enableRowResizing={false}
      enableColumnResizing={false}
      selectionModes={SelectionModes.NONE}
    >
      <Column name={'ISBN'} cellRenderer={index => <Cell>{purchase?.books[index].isbn}</Cell>} />
      <Column name={'Amount'} cellRenderer={index => <Cell>{purchase?.books[index].amount}</Cell>} />
    </Table>
  </Alert>
);
