import { callApi } from '../utils/api.utils';
import { TEvent } from '../store/store';

const getEvents = async (): Promise<TEvent[]> => {
  return callApi('/events');
};

const newEvent = async (event: TEvent): Promise<TEvent> => {
  return callApi('/events/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(event),
  });
};

export const EventsApi = {
  getEvents,
  newEvent,
};
