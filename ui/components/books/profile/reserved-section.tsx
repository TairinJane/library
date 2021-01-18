import { ReservationsTable } from '../../tables/reservations-table';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TReservedBook, TStore } from '../../../store/store';
import { TLoadableList } from '../../../utils/state.utils';
import { BooksThunks } from '../../../actions/books/books.thunks';

type Props = {
  bookId: number;
};

export const ReservedSection = ({ bookId }: Props) => {
  const dispatch = useDispatch();
  const { entities: reservations, isFetching, isLoaded } =
    useSelector<TStore, TLoadableList<TReservedBook>>(store => store.books.profiles[bookId]?.reserved) || {};

  useEffect(() => {
    if (!reservations && !isLoaded) dispatch(BooksThunks.getReserved(bookId));
  }, [reservations, bookId, isLoaded]);

  return (
    <>
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">Reservations</h2>
      {isLoaded && !!reservations?.length ? (
        <ReservationsTable books={reservations} />
      ) : isFetching ? (
        'Reservations are fetching...'
      ) : (
        'Nobody reserved this book'
      )}
    </>
  );
};
