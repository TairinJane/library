import { ActionType, getType } from 'typesafe-actions';
import { eventsStoreDefaults, TEventsStore } from '../store/store';
import produce from 'immer';
import { EventsActions } from '../actions/events.actions';

type TEventsActions = ActionType<typeof EventsActions>;

export const eventsReducer = (state = eventsStoreDefaults, action: TEventsActions): TEventsStore => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(EventsActions.getEvents.request):
        draft.search.isFetching = true;
        draft.search.entities = [];
        break;
      case getType(EventsActions.getEvents.success):
        draft.search.entities = action.payload;
        draft.search.isFetching = false;
        draft.search.isLoaded = true;
        break;
      case getType(EventsActions.getEvents.failure):
        draft.search.isFetching = false;
        draft.search.isError = true;
        break;
      case getType(EventsActions.newEvent.success):
        const events = state.search.entities;
        if (!!events?.length) draft.search.entities = [action.payload, ...events];
    }
  });
};
