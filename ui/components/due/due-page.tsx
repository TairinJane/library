import React, { useCallback, useEffect, useState } from 'react';
import { HistoryTable } from '../tables/history-table';
import { TBorrowedBook, TStore } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@blueprintjs/core';
import { BooksThunks } from '../../actions/books/books.thunks';
import { ReadersThunks } from '../../actions/readers/readers.thunks';
import { TLoadableList } from '../../utils/state.utils';

export const DuePage = () => {
  const dispatch = useDispatch();

  const { entities: books, isFetching, isError } = useSelector<TStore, TLoadableList<TBorrowedBook>>(
    store => store.books.due,
  );

  const [bookToReturn, setBookToReturn] = useState<TBorrowedBook>();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!books?.length && !isFetching && !isError) dispatch(BooksThunks.fetchDueBooks());
  }, [books, isFetching, isError]);

  const onCancel = useCallback(() => {
    setBookToReturn(null);
    setOpen(false);
  }, []);

  const onConfirm = useCallback(() => {
    dispatch(ReadersThunks.returnBook(bookToReturn.id));
    setOpen(false);
  }, [bookToReturn]);

  const onBookSelect = useCallback(
    (rowIndex: number) => {
      const book = books[rowIndex];
      if (!book.returnDate) {
        setBookToReturn(book);
        setOpen(true);
      }
    },
    [books],
  );

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Due Books</h1>
      {!!books?.length ? (
        <HistoryTable books={books} onRowClick={onBookSelect} readerColumn />
      ) : (
        <div>{isFetching ? 'Due books are loading...' : 'No due books yet'}</div>
      )}
      <Alert confirmButtonText="Yes" cancelButtonText="No" isOpen={isOpen} onCancel={onCancel} onConfirm={onConfirm}>
        <p className="text-bold">Do you want to return this book?</p>
        <p>{bookToReturn?.book.title ?? ''}</p>
      </Alert>
    </>
  );
};
