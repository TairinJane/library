import { TBook, TReader } from '../store/store';
import { createAction } from 'typesafe-actions';

const pickReader = createAction('LEND/PICK_READER')<TReader>();
const pickBook = createAction('LEND/PICK_Book')<TBook>();

export const LendActions = {
  pickReader,
  pickBook,
};
