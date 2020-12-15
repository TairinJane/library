import React from 'react';
import { TReader } from '../../store/store';
import { Cell, Column, Table } from '@blueprintjs/table';
import { Button } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { LendActions } from '../../actions/lend.actions';
import { useHistory } from 'react-router';

type Props = {
  readers?: TReader[];
  enableLend?: boolean;
};

export const ReadersTable = ({ readers, enableLend = false }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const nameCellRenderer = (rowIndex: number) => {
    const reader = readers[rowIndex];
    return <Cell>{`${reader.firstName} ${reader.lastName} ${reader.patronymic ?? ''}`}</Cell>;
  };
  const birthDateCellRenderer = (rowIndex: number) => <Cell>{readers[rowIndex]?.birthDate}</Cell>;
  const registrationRenderer = (rowIndex: number) => <Cell>{readers[rowIndex]?.registrationDate}</Cell>;
  const lendRenderer = (rowIndex: number) => {
    const lendBook = (reader: TReader) => {
      dispatch(LendActions.pickReader(reader));
      history.push('/lend');
    };
    return (
      <Cell>
        <Button onClick={() => lendBook(readers[rowIndex])}>Lend a Book</Button>
      </Cell>
    );
  };

  return (
    <Table numRows={readers?.length} className="offset-top-24" defaultRowHeight={35} enableRowResizing={false}>
      <Column name={'Name'} cellRenderer={nameCellRenderer} />
      <Column name={'Birth Date'} cellRenderer={birthDateCellRenderer} />
      <Column name={'Registration Date'} cellRenderer={registrationRenderer} />
      {enableLend && <Column name={'Lend a Book'} cellRenderer={lendRenderer} />}
    </Table>
  );
};
