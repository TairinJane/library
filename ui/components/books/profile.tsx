import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Grid } from '@material-ui/core';
import { TBookInfo, TBorrowedBook, TReservedBook, TStore } from '../../store/store';
import { TLoadableList } from '../../utils/state.utils';
import { BooksThunks } from '../../actions/books/books.thunks';
import { HistoryTable } from '../tables/history-table';
import { ReservationsTable } from '../tables/reservations-table';
import { personFullName } from '../../utils/title.utils';

export const BookProfile = ({ match }: RouteComponentProps<{ id?: string }>) => {
  const dispatch = useDispatch();
  const bookId = +match.params.id;
  const { book, isFetching: isInfoFetching, isLoaded: isInfoLoaded } =
    useSelector<TStore, TBookInfo>(store => store.books.profiles[bookId]?.info) || {};
  const { entities: onHands, isFetching: isHandsFetching, isLoaded: isHandsLoaded } =
    useSelector<TStore, TLoadableList<TBorrowedBook>>(store => store.books.profiles[bookId]?.hands) || {};
  const { entities: history, isFetching: isHistoryFetching, isLoaded: isHistoryLoaded } =
    useSelector<TStore, TLoadableList<TBorrowedBook>>(store => store.books.profiles[bookId]?.history) || {};
  const { entities: reservations, isFetching: isReservationsFetching, isLoaded: isReservationsLoaded } =
    useSelector<TStore, TLoadableList<TReservedBook>>(store => store.books.profiles[bookId]?.reserved) || {};

  useEffect(() => {
    if (!book) dispatch(BooksThunks.getBookInfo(bookId));
  }, [book, bookId]);

  useEffect(() => {
    if (!history && !onHands) dispatch(BooksThunks.getHistory(bookId));
  }, [history, onHands, bookId]);

  useEffect(() => {
    if (!reservations) dispatch(BooksThunks.getReserved(bookId));
  }, [reservations, bookId]);

  return !!book ? (
    <>
      <h1 className="bp3-heading offset-bottom-24">{book.title}</h1>
      <Grid container direction={'column'} spacing={2}>
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
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">On hands</h2>
      {!!onHands?.length ? <HistoryTable books={onHands} readerColumn bookProfile /> : 'Nobody have this book now'}
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">Reservations</h2>
      {!!reservations?.length ? <ReservationsTable books={reservations} /> : 'Nobody reserved this book'}
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">History</h2>
      {!!history?.length ? <HistoryTable books={history} readerColumn bookProfile /> : 'Nobody took this book yet'}
    </>
  ) : (
    <h1 className="bp3-heading offset-bottom-24">Book is loading...</h1>
  );
};
