import { Grid } from '@material-ui/core';
import { personFullName } from '../../../utils/title.utils';
import React, { useEffect } from 'react';
import { TBookInfo, TStore } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { BooksThunks } from '../../../actions/books/books.thunks';

type Props = {
  bookId: number;
};

export const GeneralInfo = ({ bookId }: Props) => {
  const dispatch = useDispatch();
  const { book, isFetching, isLoaded } =
    useSelector<TStore, TBookInfo>(store => store.books.profiles[bookId]?.info) || {};

  useEffect(() => {
    if (!book && !isFetching) dispatch(BooksThunks.getBookInfo(bookId));
  }, [book, bookId, isFetching]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">{isLoaded ? book.title : 'Book is loading...'}</h1>
      {isLoaded && (
        <Grid container direction={'column'} spacing={1}>
          <Grid item>
            <span className="text-bold">Authors:</span> {book.authors.map(author => personFullName(author)).join(',')}
          </Grid>
          <Grid item>
            <span className="text-bold">ISBN:</span> {book.isbn}
          </Grid>
          <Grid item>
            <span className="text-bold">Publication Year:</span> {book.publicationYear}
          </Grid>
          <Grid item>
            <span className="text-bold">Genre:</span> {book.genre}
          </Grid>
          <Grid item>
            <span className="text-bold">In library:</span> {book.amount}
          </Grid>
        </Grid>
      )}
    </>
  );
};
