import { createAsyncAction } from 'typesafe-actions';
import { TEvent } from '../../store/store';

const getEvents = createAsyncAction('EVENTS/SEARCH_REQ', 'EVENTS/SEARCH_SUCCESS', 'EVENTS/SEARCH_ERROR')<
  [undefined, undefined],
  TEvent[],
  [undefined, undefined]
>();

const newEvent = createAsyncAction('EVENTS/NEW_REQ', 'EVENTS/NEW_SUCCESS', 'EVENTS/NEW_ERROR')<
  TEvent,
  TEvent,
  [undefined, undefined]
>();

export const EventsActions = {
  getEvents,
  newEvent,
};
