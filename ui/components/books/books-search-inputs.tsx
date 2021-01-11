import { Grid } from '@material-ui/core';
import { Button, InputGroup } from '@blueprintjs/core';
import React, { useCallback, useState } from 'react';
import { BooksThunks } from '../../actions/books.thunks';
import { useDispatch } from 'react-redux';
import { capitalize } from '../../utils/utils';

export const BooksSearchInputs = () => {
  const dispatch = useDispatch();
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [title, setTitle] = useState('');

  const handleSearch = useCallback(() => {
    if (title || authorFirstName || authorLastName)
      dispatch(BooksThunks.findBooks(title, capitalize(authorFirstName), capitalize(authorLastName)));
  }, [title, authorFirstName, authorLastName]);

  return (
    <Grid container spacing={2} alignItems={'flex-end'} wrap={'wrap'}>
      <Grid item xs={5}>
        <span className="input-title">Title</span>
        <InputGroup
          placeholder={'Title'}
          className="offset-top-8"
          value={title}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs>
        <span className="input-title">Author Last Name</span>
        <InputGroup
          placeholder={'Author Last Name'}
          className="offset-top-8"
          value={authorLastName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setAuthorLastName(e.currentTarget.value)}
        />
      </Grid>
      <Grid item xs>
        <span className="input-title">Author First Name</span>
        <InputGroup
          placeholder={'Author First Name'}
          className="offset-top-8"
          value={authorFirstName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setAuthorFirstName(e.currentTarget.value)}
        />
      </Grid>
      <Grid item>
        <Button icon={'search'} intent={'primary'} onClick={handleSearch} />
      </Grid>
    </Grid>
  );
};
