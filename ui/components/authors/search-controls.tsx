import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Button, InputGroup } from '@blueprintjs/core';
import { AuthorsThunks } from '../../actions/authors/authors.thunks';
import { capitalize } from '../../utils/utils';

export const AuthorsSearchControls = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSearch = useCallback(() => {
    if (firstName || lastName) dispatch(AuthorsThunks.findAuthors(capitalize(firstName), capitalize(lastName)));
  }, [firstName, lastName]);

  return (
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
      <Grid item xs={1}>
        <Button icon={'search'} intent={'primary'} onClick={handleSearch} />
      </Grid>
    </Grid>
  );
};
