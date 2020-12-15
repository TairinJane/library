import { Dispatch } from 'redux';
import { ReadersActions } from './readers.actions';
import { ReadersApi } from '../api/readers.api';

const findReaders = (firstName?: string, lastName?: string) => {
  return (dispatch: Dispatch) => {
    const meta = { firstName, lastName };
    dispatch(ReadersActions.findReaders.request(undefined, meta));
    return ReadersApi.getReaders(firstName, lastName)
      .then(json => dispatch(ReadersActions.findReaders.success(json, meta)))
      .catch(() => dispatch(ReadersActions.findReaders.failure(undefined, meta)));
  };
};

export const ReadersThunks = {
  findReaders,
};
