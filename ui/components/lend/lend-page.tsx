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
import { DateInput } from '@blueprintjs/datetime';
import { personFullName } from '../../utils/title.utils';

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
  const [dueDate, setDueDate] = useState<Date>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 10);
    return today;
  });

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
    console.log('lend book:', pickedBook.title, pickedReader.firstName, dueDate);
    dispatch(BooksThunks.lendBook(pickedReader.id, pickedBook.id, dueDate));
  }, [pickedBook, pickedReader, dueDate]);

  return (
    <>
      <h1 className="bp3-heading">Lend Book</h1>
      <h2 className="bp3-heading offset-top-24">Reader</h2>
      <div className="offset-top-12">
        {pickedReader ? (
          <Grid container justify={'space-between'}>
            <Grid item>{personFullName(pickedReader)}</Grid>
            <Grid item>
              <Button onClick={() => setPickedReader(null)} icon={'trash'} />
            </Grid>
          </Grid>
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
      <h2 className="bp3-heading offset-top-24">Book</h2>
      {pickedBook ? (
        <Grid container justify={'space-between'}>
          <Grid item>{pickedBook.title}</Grid>
          <Grid item>
            <Button onClick={() => setPickedBook(null)} icon={'trash'} />
          </Grid>
        </Grid>
      ) : (
        <>
          <BooksSearchInputs />
          {!!books?.length && isBooksLoaded ? (
            <BooksTable books={books} onRowClick={onBookSelect} markUnavailable />
          ) : (
            <div className="offset-top-24 text-center">
              {isBooksFetching ? 'Books are loading...' : 'No books found'}
            </div>
          )}
        </>
      )}
      <h2 className="bp3-heading offset-top-24">Due Date</h2>
      <DateInput
        formatDate={date => date.toLocaleDateString()}
        onChange={date => setDueDate(date)}
        parseDate={str => new Date(str)}
        placeholder={'DD.MM.YYYY'}
        minDate={new Date()}
        value={dueDate}
      />
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
