import { HistoryTable } from '../../tables/history-table';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TBorrowedBook, TStore } from '../../../store/store';
import { TLoadableList } from '../../../utils/state.utils';
import { BooksThunks } from '../../../actions/books/books.thunks';

type Props = {
  bookId: number;
};

export const HandsSection = ({ bookId }: Props) => {
  const dispatch = useDispatch();

  const { entities: onHands, isFetching, isLoaded } =
    useSelector<TStore, TLoadableList<TBorrowedBook>>(store => store.books.profiles[bookId]?.hands) || {};

  useEffect(() => {
    if (!onHands && !isFetching) dispatch(BooksThunks.getHistory(bookId));
  }, [onHands, bookId, isFetching]);

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
    </>
  );
};
