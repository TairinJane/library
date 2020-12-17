import React, { useCallback } from 'react';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';
import { TBorrowedBook } from '../../../store/store';

type Props = {
  books?: TBorrowedBook[];
  onRowClick?: (rowIndex: number) => void;
};

export const HistoryTable = ({ books, onRowClick }: Props) => {
  const titleCellRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.book.title}</Cell>;
  const authorCellRenderer = (rowIndex: number) => {
    const authors = books[rowIndex]?.book.authors.map(
      author => `${author.firstName} ${author.lastName[0]}. ${author.patronymic ? author.patronymic[0] + '.' : ''}`,
    );
    return <Cell>{authors.join(', ')}</Cell>;
  };
  const borrowRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.borrowDate}</Cell>;
  const dueRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.dueDate}</Cell>;
  const returnRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.returnDate ?? ''}</Cell>;

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
      <Column name={'Title'} cellRenderer={titleCellRenderer} />
      <Column name={'Author'} cellRenderer={authorCellRenderer} />
      <Column name={'Borrow Date'} cellRenderer={borrowRenderer} />
      <Column name={'Due Date'} cellRenderer={dueRenderer} />
      <Column name={'Return Date'} cellRenderer={returnRenderer} />
    </Table>
  );
};
