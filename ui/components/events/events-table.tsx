import React, { useCallback } from 'react';
import { TEvent } from '../../store/store';
import { Cell, Column, SelectionModes, Table } from '@blueprintjs/table';
import { IFocusedCellCoordinates } from '@blueprintjs/table/lib/esm/common/cell';
import { personInitials } from '../../utils/title.utils';

type Props = {
  events?: TEvent[];
  onRowClick?: (rowIndex: number) => void;
};

export const EventsTable = ({ events, onRowClick }: Props) => {
  const titleRenderer = (rowIndex: number) => <Cell>{events[rowIndex].title}</Cell>;
  const employeeRenderer = (rowIndex: number) => <Cell interactive>{personInitials(events[rowIndex].employee)}</Cell>;
  const eventDateRenderer = (rowIndex: number) => <Cell interactive>{events[rowIndex].eventDate}</Cell>;
  const placeRenderer = (rowIndex: number) => <Cell interactive>{events[rowIndex].eventPlace}</Cell>;

  const onFocus = useCallback(
    (focusedCell: IFocusedCellCoordinates) => {
      onRowClick(focusedCell.row);
    },
    [onRowClick],
  );

  return (
    <Table
      numRows={events?.length}
      className="offset-top-24"
      enableRowResizing={false}
      enableFocusedCell={!!onRowClick}
      onFocusedCell={!!onRowClick ? onFocus : null}
      selectionModes={onRowClick ? SelectionModes.ROWS_AND_CELLS : SelectionModes.NONE}
    >
      <Column name={'Title'} cellRenderer={titleRenderer} />
      <Column name={'Employee'} cellRenderer={employeeRenderer} />
      <Column name={'Event Date'} cellRenderer={eventDateRenderer} />
      <Column name={'Place'} cellRenderer={placeRenderer} />
    </Table>
  );
};
