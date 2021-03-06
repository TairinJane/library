import React, { useCallback } from 'react';
import { TReader } from '../../store/store';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';
import { personFullName } from '../../utils/title.utils';

type Props = {
  readers?: TReader[];
  onRowClick?: (rowIndex: number) => void;
};

export const ReadersTable = ({ readers, onRowClick }: Props) => {
  const nameCellRenderer = (rowIndex: number) => {
    const reader = readers[rowIndex];
    const name = personFullName(reader);
    return <Cell>{name}</Cell>;
  };
  const birthDateCellRenderer = (rowIndex: number) => <Cell interactive>{readers[rowIndex]?.birthDate}</Cell>;
  const registrationRenderer = (rowIndex: number) => <Cell interactive>{readers[rowIndex]?.registrationDate}</Cell>;

  const onFocus = useCallback(
    (focusedCell: IFocusedCellCoordinates) => {
      onRowClick(focusedCell.row);
    },
    [onRowClick],
  );

  return (
    <Table
      numRows={readers?.length}
      className="offset-top-24"
      enableRowResizing={false}
      enableFocusedCell={!!onRowClick}
      onFocusedCell={!!onRowClick ? onFocus : null}
      selectionModes={SelectionModes.ROWS_AND_CELLS}
    >
      <Column name={'Name'} cellRenderer={nameCellRenderer} />
      <Column name={'Birth Date'} cellRenderer={birthDateCellRenderer} />
      <Column name={'Registration Date'} cellRenderer={registrationRenderer} />
    </Table>
  );
};
