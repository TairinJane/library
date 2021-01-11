import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TBook, TBooksStore, TReader, TReadersStore, TStore } from '../../store/store';
import { BooksTable } from '../tables/books-table';
import { BooksSearchInputs } from '../books/books-search-inputs';
import { ReadersSearchControls } from '../readers/search/readers-search-controls';
import { ReadersTable } from '../tables/readers-table';
import { Grid } from '@material-ui/core';
import { Button } from '@blueprintjs/core';
import { useHistory } from 'react-router';
import { BooksThunks } from '../../actions/books.thunks';

export const LendPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { search: readers } = useSelector<TStore, TReadersStore>(store => store.readers);
  const { search: books } = useSelector<TStore, TBooksStore>(store => store.books);
  const isLendSuccess = useSelector<TStore, boolean>(store => store.books.lend?.isSuccess) || false;

  const [pickedReader, setPickedReader] = useState<TReader>();
  const [pickedBook, setPickedBook] = useState<TBook>();

  useEffect(() => {
    if (isLendSuccess) {
      // dispatch(PurchasesActions.clearSearch());
      // dispatch(LendActions.clearLendInfo());
      history.push('/');
    }
  }, [isLendSuccess]);

  const onReaderSelect = useCallback(
    (rowIndex: number) => {
      setPickedReader(readers[rowIndex]);
    },
    [readers],
  );

  const onBookSelect = useCallback(
    (rowIndex: number) => {
      const book = books[rowIndex];
      if (book.available > 0) setPickedBook(book);
    },
    [books],
  );

  const onLend = useCallback(() => {
    console.log('lend book:', pickedBook.title, pickedReader.firstName);
    dispatch(BooksThunks.lendBook(pickedReader.id, pickedBook.id));
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
