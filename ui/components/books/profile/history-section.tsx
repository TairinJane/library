import { HistoryTable } from '../../tables/history-table';
import React, { useEffect } from 'react';
import { BooksThunks } from '../../../actions/books/books.thunks';
import { useDispatch, useSelector } from 'react-redux';
import { TBorrowedBook, TStore } from '../../../store/store';
import { TLoadableList } from '../../../utils/state.utils';

type Props = {
  bookId: number;
};

export const HistorySection = ({ bookId }: Props) => {
  const dispatch = useDispatch();
  const { entities: history, isFetching, isLoaded } =
    useSelector<TStore, TLoadableList<TBorrowedBook>>(store => store.books.profiles[bookId]?.history) || {};

  useEffect(() => {
    if (!history && !isFetching) dispatch(BooksThunks.getHistory(bookId));
  }, [history, bookId]);

  return (
    <>
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">History</h2>
      {isLoaded && history.length ? (
        <HistoryTable books={history} readerColumn bookProfile />
      ) : isFetching ? (
        'History is loading...'
      ) : (
        'Nobody took this book yet'
      )}
    </>
  );
};
