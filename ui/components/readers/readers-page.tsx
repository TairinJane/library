import React, { useCallback, useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { TReader, TStore } from '../../store/store';
import { ReadersTable } from './readers-table';
import { ReadersThunks } from '../../actions/readers.thunks';

export const ReadersPage = () => {
  const dispatch = useDispatch();
  const readers = useSelector<TStore, TReader[]>(store => store.search.readers);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleSearch = useCallback(() => {
    if (firstName || lastName) dispatch(ReadersThunks.findReaders(firstName, lastName));
  }, [firstName, lastName]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Readers</h1>
      <Grid container spacing={2} alignItems={'flex-end'} wrap={'wrap'}>
        <Grid item xs={5}>
          <span className="input-title">First Name</span>
          <InputGroup
            placeholder={'First Name'}
            className="offset-top-8"
            value={firstName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <span className="input-title">Last Name</span>
          <InputGroup
            placeholder={'Last Name'}
            className="offset-top-8"
            value={lastName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
          />
        </Grid>
        <Grid item>
          <Button icon={'search'} intent={'primary'} onClick={handleSearch} />
        </Grid>
      </Grid>
      {!!readers?.length ? (
        <ReadersTable readers={readers} />
      ) : (
        <div className="offset-top-24 text-center">No results</div>
      )}
    </>
  );
};
