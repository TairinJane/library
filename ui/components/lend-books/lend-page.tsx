import React from 'react';
import { useSelector } from 'react-redux';
import { TBook, TReader, TStore } from '../../store/store';
import { BooksTable } from '../books/books-table';
import { BooksSearchInputs } from '../books/books-search-inputs';

export const LendPage = () => {
  const books = useSelector<TStore, TBook[]>(store => store.search.books);
  const pickedReader = useSelector<TStore, TReader>(store => store.lend?.reader);

  // TODO: get reader info from store
  return (
    <>
      <h1 className="bp3-heading">Lend a Book</h1>
      <h2 className="bp3-heading offset-top-24">Reader</h2>
      <div className="offset-top-12">
        {pickedReader
          ? `${pickedReader.firstName} ${pickedReader.lastName} ${pickedReader.patronymic ?? ''}`
          : 'Pick a Reader on readers page first'}
      </div>
      {pickedReader && (
        <>
          <h2 className="bp3-heading offset-top-24">Book</h2>
          <BooksSearchInputs />
          {!!books?.length ? <BooksTable books={books} /> : <div className="offset-top-24 text-center">No results</div>}
        </>
      )}
    </>
  );
};
