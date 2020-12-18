import React, { useCallback } from 'react';
import { TPurchase } from '../../store/store';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';

type Props = {
  purchases?: TPurchase[];
  onRowClick?: (rowIndex: number) => void;
};

export const PurchasesTable = ({ purchases, onRowClick }: Props) => {
  const supplierRenderer = (rowIndex: number) => <Cell>{purchases[rowIndex].supplier}</Cell>;
  const purchaseDateRenderer = (rowIndex: number) => <Cell interactive>{purchases[rowIndex].purchaseDate}</Cell>;
  const deliveryRenderer = (rowIndex: number) => <Cell interactive>{purchases[rowIndex].deliveryDate}</Cell>;
  const positionsRenderer = (rowIndex: number) => <Cell interactive>{purchases[rowIndex].books.length}</Cell>;

  const onFocus = useCallback(
    (focusedCell: IFocusedCellCoordinates) => {
      onRowClick(focusedCell.row);
    },
    [onRowClick],
  );

  return (
    <Table
      numRows={purchases?.length}
      className="offset-top-24"
      enableRowResizing={false}
      enableFocusedCell={!!onRowClick}
      onFocusedCell={!!onRowClick ? onFocus : null}
      selectionModes={SelectionModes.ROWS_AND_CELLS}
    >
      <Column name={'Supplier'} cellRenderer={supplierRenderer} />
      <Column name={'Purchase Date'} cellRenderer={purchaseDateRenderer} />
      <Column name={'Delivery Date'} cellRenderer={deliveryRenderer} />
      <Column name={'Positions'} cellRenderer={positionsRenderer} />
    </Table>
  );
};
