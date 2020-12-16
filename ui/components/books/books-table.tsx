import React from 'react';
import { TBook } from '../../store/store';
import { Cell, Column, Table } from '@blueprintjs/table';

type Props = {
  books?: TBook[];
};

export const BooksTable = ({ books }: Props) => {
  const titleCellRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.title}</Cell>;
  const authorCellRenderer = (rowIndex: number) => {
    const authors = books[rowIndex]?.authors.map(
      author => `${author.firstName} ${author.lastName[0]}. ${author.patronymic ? author.patronymic[0] + '.' : ''}`,
    );
    return <Cell>{authors.join(', ')}</Cell>;
  };
  const amountRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.amount}</Cell>;
  const availableRenderer = (rowIndex: number) => <Cell>{books[rowIndex]?.available}</Cell>;

  return (
    <Table numRows={books?.length} defaultRowHeight={35} enableRowResizing={false} className="offset-top-24">
      <Column name={'Title'} cellRenderer={titleCellRenderer} />
      <Column name={'Author'} cellRenderer={authorCellRenderer} />
      <Column name={'Amount'} cellRenderer={amountRenderer} />
      <Column name={'Available'} cellRenderer={availableRenderer} />
    </Table>
  );
};
