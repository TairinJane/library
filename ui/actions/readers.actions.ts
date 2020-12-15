import { TReader } from '../store/store';
import { createAsyncAction } from 'typesafe-actions';

type TReadersMeta = { firstName?: string; lastName?: string };

const findReaders = createAsyncAction(
  'READERS/GET_READERS_REQ',
  'READERS/GET_READERS_SUCCESS',
  'READERS/GET_READERS_ERROR',
)<[undefined, TReadersMeta], [TReader[], TReadersMeta], [undefined, TReadersMeta]>();

export const ReadersActions = {
  findReaders,
};
