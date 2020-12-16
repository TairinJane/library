import { TReader } from '../store/store';
import { createAction, createAsyncAction } from 'typesafe-actions';

type TReadersMeta = { firstName?: string; lastName?: string };

const findReaders = createAsyncAction(
  'READERS/GET_READERS_REQ',
  'READERS/GET_READERS_SUCCESS',
  'READERS/GET_READERS_ERROR',
)<[undefined, TReadersMeta], [TReader[], TReadersMeta], [undefined, TReadersMeta]>();

const saveReaderInfo = createAction('READERS/SAVE_READER_INFO')<TReader>();

export const ReadersActions = {
  findReaders,
  saveReaderInfo,
};
