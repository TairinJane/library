import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TBook, TReader, TStore } from '../../store/store';
import { BooksTable } from '../books/books-table';
import { BooksSearchInputs } from '../books/books-search-inputs';
import { ReadersSearchControls } from '../readers/search/readers-search-controls';
import { ReadersTable } from '../readers/readers-table';
import { Grid } from '@material-ui/core';
import { Button } from '@blueprintjs/core';
import { LendThunks } from '../../actions/lend.thunks';

export const LendPage = () => {
  const dispatch = useDispatch();

  const readers = useSelector<TStore, TReader[]>(store => store.search.readers);
  const books = useSelector<TStore, TBook[]>(store => store.search.books);

  const [pickedReader, setPickedReader] = useState<TReader>();
  const [pickedBook, setPickedBook] = useState<TBook>();

  const onReaderSelect = useCallback(
    (rowIndex: number) => {
      setPickedReader(readers[rowIndex]);
    },
    [readers],
  );

  const onBookSelect = useCallback(
    (rowIndex: number) => {
      setPickedBook(books[rowIndex]);
    },
    [books],
  );

  const onLend = useCallback(() => {
    console.log('lend book:', pickedBook.title, pickedReader.firstName);
    dispatch(LendThunks.lendBook(pickedReader.id, pickedBook.id));
  }, [pickedBook, pickedReader]);

  return (
    <>
      <h1 className="bp3-heading">Lend Book</h1>
      <h2 className="bp3-heading offset-top-24">Pick Reader</h2>
      <div className="offset-top-12">
        {pickedReader ? (
          `${pickedReader.firstName} ${pickedReader.lastName} ${pickedReader.patronymic ?? ''}`
        ) : (
          <>
            <ReadersSearchControls />
            {!!readers?.length ? (
              <ReadersTable readers={readers} onRowClick={onReaderSelect} />
            ) : (
              <div className="offset-top-24 text-center">No results</div>
            )}
          </>
        )}
      </div>
      <h2 className="bp3-heading offset-top-24">Pick Book</h2>
      {pickedBook ? (
        `${pickedBook.title}`
      ) : (
        <>
          <BooksSearchInputs />
          {!!books?.length ? (
            <BooksTable books={books} onRowClick={onBookSelect} />
          ) : (
            <div className="offset-top-24 text-center">No results</div>
          )}
        </>
      )}
      <Grid container justify={'flex-end'}>
        <Grid item xs>
          <Button disabled={!pickedBook || !pickedReader} intent={'primary'} className="offset-top-24" onClick={onLend}>
            Lend book
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
