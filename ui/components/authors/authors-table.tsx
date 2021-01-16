import React, { useCallback } from 'react';
import { TAuthor } from '../../store/store';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';
import { personFullName } from '../../utils/title.utils';

type Props = {
  authors?: TAuthor[];
  onRowClick?: (rowIndex: number) => void;
};

export const AuthorsTable = ({ authors, onRowClick }: Props) => {
  const nameCellRenderer = (rowIndex: number) => <Cell>{personFullName(authors[rowIndex])}</Cell>;
  const birthDateCellRenderer = (rowIndex: number) => <Cell interactive>{authors[rowIndex].birthDate}</Cell>;
  const deathDateRenderer = (rowIndex: number) => <Cell interactive>{authors[rowIndex].deathDate}</Cell>;

  const onFocus = useCallback(
    (focusedCell: IFocusedCellCoordinates) => {
      onRowClick(focusedCell.row);
    },
    [onRowClick],
  );

  return (
    <Table
      numRows={authors?.length}
      className="offset-top-24"
      enableRowResizing={false}
      enableFocusedCell={!!onRowClick}
      onFocusedCell={!!onRowClick ? onFocus : null}
      selectionModes={SelectionModes.ROWS_AND_CELLS}
    >
      <Column name={'Name'} cellRenderer={nameCellRenderer} />
      <Column name={'Birth Date'} cellRenderer={birthDateCellRenderer} />
      <Column name={'Death Date'} cellRenderer={deathDateRenderer} />
    </Table>
  );
};
