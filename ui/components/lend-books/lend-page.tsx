import React from 'react';
import { useSelector } from 'react-redux';
import { TBook, TStore } from '../../store/store';
import { BooksTable } from '../books/books-table';
import { BooksSearchInputs } from '../books/books-search-inputs';

export const LendPage = () => {
  const books = useSelector<TStore, TBook[]>(store => store.search.books);

  // TODO: get reader info from store
  return (
    <>
      <h1 className="bp3-heading">Lend a Book</h1>
      <h2 className="bp3-heading offset-top-24">Reader</h2>
      <div>Reader Info !!!!</div>
      <h2 className="bp3-heading offset-top-24">Book</h2>
      <BooksSearchInputs />
      {!!books?.length ? <BooksTable books={books} /> : <div className="offset-top-24 text-center">No results</div>}
    </>
  );
};
