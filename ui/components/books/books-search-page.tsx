import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TBook, TStore } from '../../store/store';
import { BooksTable } from '../tables/books-table';
import { BooksSearchInputs } from './books-search-inputs';
import { useHistory } from 'react-router';
import { BookActions } from '../../actions/books/books.actions';
import { TLoadableList } from '../../utils/state.utils';

export const BooksSearchPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { entities: books, isFetching, isLoaded } = useSelector<TStore, TLoadableList<TBook>>(
    store => store.books.search,
  );

  const onBookSelect = useCallback(
    (rowIndex: number) => {
      const book = books[rowIndex];
      dispatch(BookActions.saveBookInfo(book));
      history.push(`/books/${book.id}`);
    },
    [books],
  );

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Books Search</h1>
      <BooksSearchInputs />
      {!!books?.length && isLoaded ? (
        <BooksTable books={books} onRowClick={onBookSelect} />
      ) : (
        <div className="offset-top-24 text-center">{isFetching ? 'Books are loading...' : 'No results'}</div>
      )}
    </>
  );
};
