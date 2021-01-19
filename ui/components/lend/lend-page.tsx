import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TBook, TReader, TStore } from '../../store/store';
import { BooksTable } from '../tables/books-table';
import { BooksSearchInputs } from '../books/books-search-inputs';
import { ReadersSearchControls } from '../readers/search/readers-search-controls';
import { ReadersTable } from '../tables/readers-table';
import { Grid } from '@material-ui/core';
import { Button } from '@blueprintjs/core';
import { useHistory } from 'react-router';
import { BooksThunks } from '../../actions/books/books.thunks';
import { TLoadableList } from '../../utils/state.utils';
import { BookActions } from '../../actions/books/books.actions';

export const LendPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { entities: readers, isFetching, isLoaded } = useSelector<TStore, TLoadableList<TReader>>(
    store => store.readers.search,
  );
  const { entities: books, isFetching: isBooksFetching, isLoaded: isBooksLoaded } = useSelector<
    TStore,
    TLoadableList<TBook>
  >(store => store.books.search);
  const isLendSuccess = useSelector<TStore, boolean>(store => store.books.lend?.isSuccess) || false;

  const [pickedReader, setPickedReader] = useState<TReader>();
  const [pickedBook, setPickedBook] = useState<TBook>();

  useEffect(() => {
    if (isLendSuccess) {
      dispatch(BookActions.clearLendInfo());
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
            {!!readers?.length && isLoaded ? (
              <ReadersTable readers={readers} onRowClick={onReaderSelect} />
            ) : (
              <div className="offset-top-24 text-center">
                {isFetching ? 'Readers are loading...' : 'No readers found'}
              </div>
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
          {!!books?.length && isBooksLoaded ? (
            <BooksTable books={books} onRowClick={onBookSelect} lendPage />
          ) : (
            <div className="offset-top-24 text-center">
              {isBooksFetching ? 'Books are loading...' : 'No books found'}
            </div>
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
