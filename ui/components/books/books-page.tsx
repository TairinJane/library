import React, { useCallback, useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { TBook, TStore } from '../../store/store';
import { BooksThunks } from '../../actions/books.thunks';
import { BooksTable } from './books-table';

export const BooksPage = () => {
  const dispatch = useDispatch();
  const books = useSelector<TStore, TBook[]>(store => store.search.books);
  const [title, setTitle] = useState('');

  const handleSearch = useCallback(() => {
    dispatch(BooksThunks.findBooks(title));
  }, [title]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Books</h1>
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
          <InputGroup placeholder={'Author Last Name'} className="offset-top-8" />
        </Grid>
        <Grid item xs>
          <span className="input-title">Author First Name</span>
          <InputGroup placeholder={'Author First Name'} className="offset-top-8" />
        </Grid>
        <Grid item>
          <Button icon={'search'} intent={'primary'} onClick={handleSearch} />
        </Grid>
      </Grid>
      {!!books?.length && <BooksTable books={books} />}
    </>
  );
};
