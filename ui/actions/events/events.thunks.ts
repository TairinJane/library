import { Dispatch } from 'redux';
import { TEvent } from '../../store/store';
import { EventsActions } from './events.actions';
import { EventsApi } from '../../api/events.api';

const getEvents = () => {
  return (dispatch: Dispatch) => {
    dispatch(EventsActions.getEvents.request());
    return EventsApi.getEvents()
      .then(json => dispatch(EventsActions.getEvents.success(json)))
      .catch(() => dispatch(EventsActions.getEvents.failure()));
  };
};

const newEvent = (event: TEvent) => {
  return (dispatch: Dispatch) => {
    dispatch(EventsActions.newEvent.request(event));
    return EventsApi.newEvent(event)
      .then(json => dispatch(EventsActions.newEvent.success(json)))
      .catch(() => dispatch(EventsActions.newEvent.failure()));
  };
};

export const EventsThunks = {
  getEvents,
  newEvent,
};
