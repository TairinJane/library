import { Dispatch } from 'redux';
import { ReadersActions } from './readers.actions';
import { ReadersApi } from '../../api/readers.api';

const findReaders = (firstName?: string, lastName?: string) => {
  return (dispatch: Dispatch) => {
    const meta = { firstName, lastName };
    dispatch(ReadersActions.findReaders.request(undefined, meta));
    return ReadersApi.getReaders(firstName, lastName)
      .then(json => dispatch(ReadersActions.findReaders.success(json, meta)))
      .catch(() => dispatch(ReadersActions.findReaders.failure(undefined, meta)));
  };
};

const getReaderHistory = (readerId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(ReadersActions.getHistory.request(readerId));
    return ReadersApi.getHistory(readerId)
      .then(json => dispatch(ReadersActions.getHistory.success(json, readerId)))
      .catch(() => dispatch(ReadersActions.getHistory.failure(readerId)));
  };
};

const getReaderInfo = (readerId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(ReadersActions.getReaderInfo.request(readerId));
    return ReadersApi.getReaderInfo(readerId)
      .then(json => dispatch(ReadersActions.getReaderInfo.success(json, readerId)))
      .catch(() => dispatch(ReadersActions.getReaderInfo.failure(readerId)));
  };
};

const addNewReader = (firstName: string, lastName: string, birthDate: Date, patronymic?: string) => {
  return (dispatch: Dispatch) => {
    dispatch(ReadersActions.addNewReader.request());
    return ReadersApi.addNewReader(firstName, lastName, birthDate, patronymic)
      .then(json => dispatch(ReadersActions.addNewReader.success(json)))
      .catch(() => dispatch(ReadersActions.addNewReader.failure()));
  };
};

const returnBook = (bookId: number) => {
  return (dispatch: Dispatch) => {
    dispatch(ReadersActions.returnBook.request(bookId));
    return ReadersApi.returnBook(bookId)
      .then(json => dispatch(ReadersActions.returnBook.success(json, bookId)))
      .catch(() => dispatch(ReadersActions.returnBook.failure(bookId)));
  };
};

export const ReadersThunks = {
  findReaders,
  getReaderHistory,
  getReaderInfo,
  addNewReader,
  returnBook,
};
