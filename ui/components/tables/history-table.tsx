import React, { useCallback, useMemo } from 'react';
import { Cell, Column, IColumnProps, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';
import { TBorrowedBook } from '../../store/store';
import { personInitials } from '../../utils/title.utils';

type Props = {
  books?: TBorrowedBook[];
  onRowClick?: (rowIndex: number) => void;
  readerColumn?: boolean;
  bookProfile?: boolean;
};

export const HistoryTable = ({ books, onRowClick, readerColumn = false, bookProfile = false }: Props) => {
  const titleCellRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.book.title}</Cell>;
  const authorCellRenderer = (rowIndex: number) => {
    const authors = books[rowIndex]?.book.authors.map(author => personInitials(author));
    return <Cell>{authors.join(', ')}</Cell>;
  };
  const readerCellRenderer = (rowIndex: number) => <Cell>{personInitials(books[rowIndex]?.reader)}</Cell>;
  const borrowRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.borrowDate}</Cell>;
  const dueRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.dueDate}</Cell>;
  const returnRenderer = (rowIndex: number) => (
    <Cell key={`${books[rowIndex]?.returnDate}`}>{books[rowIndex]?.returnDate ?? ''}</Cell>
  );

  const onFocus = useCallback(
    (focusedCell: IFocusedCellCoordinates) => {
      onRowClick(focusedCell.row);
    },
    [onRowClick],
  );

  const columns = useMemo(() => {
    const booksOnHands = books.reduce((count, book) => (!!book.returnDate ? count + 1 : count), 0);
    const predefinedColumns: React.ReactElement<IColumnProps>[] = [];
    if (!bookProfile)
      predefinedColumns.push(
        <Column name={'Title'} cellRenderer={titleCellRenderer} key={0} />,
        <Column name={'Author'} cellRenderer={authorCellRenderer} key={1} />,
      );
    if (readerColumn) predefinedColumns.push(<Column name={'Reader'} cellRenderer={readerCellRenderer} key={2} />);
    predefinedColumns.push(
      <Column name={'Borrow Date'} cellRenderer={borrowRenderer} key={3} />,
      <Column name={'Due Date'} cellRenderer={dueRenderer} key={4} />,
      <Column name={'Return Date'} cellRenderer={returnRenderer} key={booksOnHands} />,
    );
    return predefinedColumns;
  }, [readerColumn, books, bookProfile]);

  return (
    <Table
      numRows={books?.length}
      enableRowResizing={false}
      className="offset-top-24"
      enableFocusedCell={!!onRowClick}
      onFocusedCell={!!onRowClick ? onFocus : null}
      selectionModes={SelectionModes.ROWS_AND_CELLS}
    >
      {columns}
    </Table>
  );
};
