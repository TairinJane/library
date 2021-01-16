import { toApiURL } from '../utils/api.utils';
import { TEvent } from '../store/store';

const getEvents = async (): Promise<TEvent[]> => {
  const resp = await fetch(toApiURL('/events'));
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

const newEvent = async (event: TEvent): Promise<TEvent> => {
  const resp = await fetch(toApiURL('/events/new'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(event),
  });
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};

export const EventsApi = {
  getEvents,
  newEvent,
};
