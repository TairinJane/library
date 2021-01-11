import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TReader, TStore } from '../../../store/store';
import { ReadersTable } from '../../tables/readers-table';
import { useHistory } from 'react-router';
import { ReadersSearchControls } from './readers-search-controls';
import { ReadersActions } from '../../../actions/readers.actions';

export const ReadersSearchPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const readers = useSelector<TStore, TReader[]>(store => store.readers.search);

  const onReaderSelect = useCallback(
    (rowIndex: number) => {
      const reader = readers[rowIndex];
      dispatch(ReadersActions.saveReaderInfo(reader));
      history.push(`/reader/${reader.id}`);
    },
    [readers],
  );

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Readers Search</h1>
      <ReadersSearchControls />
      {!!readers?.length ? (
        <ReadersTable readers={readers} onRowClick={onReaderSelect} />
      ) : (
        <div className="offset-top-24 text-center">No results</div>
      )}
    </>
  );
};
