import React, { useCallback } from 'react';
import { TBook } from '../../store/store';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';

type Props = {
  books?: TBook[];
  onRowClick?: (rowIndex: number) => void;
};

export const BooksTable = ({ books, onRowClick }: Props) => {
  const titleCellRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.title}</Cell>;
  const authorCellRenderer = (rowIndex: number) => {
    const authors = books[rowIndex]?.authors.map(
      author => `${author.firstName} ${author.lastName[0]}. ${author.patronymic ? author.patronymic[0] + '.' : ''}`,
    );
    return <Cell>{authors.join(', ')}</Cell>;
  };
  const amountRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.amount}</Cell>;
  const availableRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.available}</Cell>;

  const onFocus = useCallback((focusedCell: IFocusedCellCoordinates) => {
    console.log(JSON.stringify(focusedCell));
    onRowClick(focusedCell.row);
  }, []);

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
      <Column name={'Amount'} cellRenderer={amountRenderer} />
      <Column name={'Available'} cellRenderer={availableRenderer} />
    </Table>
  );
};
