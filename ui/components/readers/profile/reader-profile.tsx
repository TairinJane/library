import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TBorrowedBook, TReaderInfo, TStore } from '../../../store/store';
import { RouteComponentProps } from 'react-router';
import { Grid } from '@material-ui/core';
import { HistoryTable } from '../../tables/history-table';
import { ReadersThunks } from '../../../actions/readers/readers.thunks';
import { Alert } from '@blueprintjs/core';
import { personFullName } from '../../../utils/title.utils';

export const ReaderProfile = ({ match }: RouteComponentProps<{ id?: string }>) => {
  const dispatch = useDispatch();
  const readerId = +match.params.id;
  const { reader, history } = useSelector<TStore, TReaderInfo>(store => store.readers.profiles[readerId]) || {};
  const [bookToReturn, setBookToReturn] = useState<TBorrowedBook>();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!reader) dispatch(ReadersThunks.getReaderInfo(readerId));
  }, [reader, readerId]);

  useEffect(() => {
    if (!history) dispatch(ReadersThunks.getReaderHistory(readerId));
  }, [history, readerId]);

  const onBookSelect = useCallback(
    (rowIndex: number) => {
      const book = history[rowIndex];
      if (!book.returnDate) {
        setBookToReturn(book);
        setOpen(true);
      }
    },
    [history],
  );

  const onCancel = useCallback(() => {
    setBookToReturn(null);
    setOpen(false);
  }, []);

  const onConfirm = useCallback(() => {
    dispatch(ReadersThunks.returnBook(bookToReturn.id));
    setOpen(false);
  }, [bookToReturn]);

  return !!reader ? (
    <>
      <h1 className="bp3-heading offset-bottom-24">{personFullName(reader)}</h1>
      <Grid container direction={'column'}>
        <Grid item>
          <span className="text-bold">Birth date:</span> {reader.birthDate}
        </Grid>
        <Grid item>
          <span className="text-bold">Registration date:</span> {reader.registrationDate}
        </Grid>
      </Grid>
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">History</h2>
      {!!history?.length ? <HistoryTable books={history} onRowClick={onBookSelect} /> : 'No history yet'}
      <Alert confirmButtonText="Yes" cancelButtonText="No" isOpen={isOpen} onCancel={onCancel} onConfirm={onConfirm}>
        <p className="text-bold">Do you want to return this book?</p>
        <p>{bookToReturn?.book.title ?? ''}</p>
      </Alert>
    </>
  ) : (
    <h1 className="bp3-heading offset-bottom-24">Reader is loading...</h1>
  );
};
