import React, { useCallback } from 'react';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';
import { TReservedBook } from '../../store/store';
import { personInitials } from '../../utils/title.utils';

type Props = {
  books?: TReservedBook[];
  onRowClick?: (rowIndex: number) => void;
};

export const ReservationsTable = ({ books, onRowClick }: Props) => {
  const titleCellRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.book.title}</Cell>;
  const reservationDateRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.reservationDate}</Cell>;
  const authorCellRenderer = (rowIndex: number) => {
    const authors = books[rowIndex]?.book.authors.map(author => personInitials(author));
    return <Cell>{authors.join(', ')}</Cell>;
  };
  const readerCellRenderer = (rowIndex: number) => <Cell>{personInitials(books[rowIndex]?.reader)}</Cell>;

  const onFocus = useCallback(
    (focusedCell: IFocusedCellCoordinates) => {
      onRowClick(focusedCell.row);
    },
    [onRowClick],
  );

  return (
    <Table
      numRows={books?.length}
      enableRowResizing={false}
      className="offset-top-24"
      enableFocusedCell={!!onRowClick}
      onFocusedCell={!!onRowClick ? onFocus : null}
      selectionModes={SelectionModes.ROWS_AND_CELLS}
    >
      {/*<Column name={'Title'} cellRenderer={titleCellRenderer} />
      <Column name={'Author'} cellRenderer={authorCellRenderer} />*/}
      <Column name={'Reader'} cellRenderer={readerCellRenderer} />
      <Column name={'Reservation Date'} cellRenderer={reservationDateRenderer} />
    </Table>
  );
};
