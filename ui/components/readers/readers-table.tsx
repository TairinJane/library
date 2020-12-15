import React from 'react';
import { TReader } from '../../store/store';
import { Cell, Column, Table } from '@blueprintjs/table';

type Props = {
  readers?: TReader[];
};

export const ReadersTable = ({ readers }: Props) => {
  const nameCellRenderer = (rowIndex: number) => {
    const reader = readers[rowIndex];
    return <Cell>{`${reader.firstName} ${reader.lastName} ${reader.patronymic ?? ''}`}</Cell>;
  };
  const birthDateCellRenderer = (rowIndex: number) => <Cell>{readers[rowIndex]?.birthDate}</Cell>;
  const registrationRenderer = (rowIndex: number) => <Cell>{readers[rowIndex]?.registrationDate}</Cell>;

  return (
    <Table numRows={readers?.length} enableRowResizing={false} className="offset-top-24">
      <Column name={'Name'} cellRenderer={nameCellRenderer} />
      <Column name={'Birth Date'} cellRenderer={birthDateCellRenderer} />
      <Column name={'Registration Date'} cellRenderer={registrationRenderer} />
    </Table>
  );
};
