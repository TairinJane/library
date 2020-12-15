import React from 'react';
import { useSelector } from 'react-redux';
import { TBook, TStore } from '../../store/store';
import { BooksTable } from './books-table';
import { BooksSearchInputs } from './books-search-inputs';

export const BooksPage = () => {
  const books = useSelector<TStore, TBook[]>(store => store.search.books);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Books</h1>
      <BooksSearchInputs />
      {!!books?.length ? <BooksTable books={books} /> : <div className="offset-top-24 text-center">No results</div>}
    </>
  );
};
