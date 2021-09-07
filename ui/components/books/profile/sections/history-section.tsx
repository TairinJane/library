import { HistoryTable } from '../../../tables/history-table';
import React, { useEffect, useMemo } from 'react';
import { BooksThunks } from '../../../../actions/books/books.thunks';
import { useDispatch, useSelector } from 'react-redux';
import { TBorrowedBook, TStore } from '../../../../store/store';
import { TLoadableList } from '../../../../utils/state.utils';

type Props = {
  bookId: number;
};

export const HistorySection = ({ bookId }: Props) => {
  const dispatch = useDispatch();
  const { entities, isFetching, isLoaded } =
    useSelector<TStore, TLoadableList<TBorrowedBook>>(store => store.books.profiles[bookId]?.history) || {};

  useEffect(() => {
    if (!entities && !isFetching) dispatch(BooksThunks.getHistory(bookId));
  }, [entities, bookId, isFetching]);

  const [history, onHands] = useMemo(() => {
    if (!entities) return [];
    const history: TBorrowedBook[] = [];
    const hands: TBorrowedBook[] = [];
    entities.forEach(book => (book.returnDate ? history.push(book) : hands.push(book)));
    return [history, hands];
  }, [entities]);

  return (
    <>
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">On hands</h2>
      {isLoaded && onHands.length ? (
        <HistoryTable books={onHands} readerColumn bookProfile />
      ) : isFetching ? (
        'Books on hands are loading...'
      ) : (
        'Nobody have this book now'
      )}
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
