import { ActionType, getType } from 'typesafe-actions';
import { eventsStoreDefaults, TEventsStore } from '../store/store';
import produce from 'immer';
import { EventsActions } from '../actions/events/events.actions';
import { TLoadableState } from '../utils/state.utils';

type TEventsActions = ActionType<typeof EventsActions>;

export const eventsReducer = (state = eventsStoreDefaults, action: TEventsActions): TEventsStore => {
  return produce(state, draft => {
    switch (action.type) {
      case getType(EventsActions.getEvents.request):
        draft.search = { ...TLoadableState.REQUEST, entities: [] };
        break;
      case getType(EventsActions.getEvents.success):
        draft.search = { ...TLoadableState.SUCCESS, entities: action.payload };
        break;
      case getType(EventsActions.getEvents.failure):
        draft.search = { ...state.search, ...TLoadableState.ERROR };
        break;
      case getType(EventsActions.newEvent.request):
        draft.add = TLoadableState.REQUEST;
        break;
      case getType(EventsActions.newEvent.success):
        const events = state.search.entities;
        if (events?.length) {
          const index = events.findIndex(event => event.eventDate < action.payload.eventDate);
          if (index != -1) draft.search.entities.splice(index, 0, action.payload);
          else draft.search.entities.push(action.payload);
        }
        draft.add = TLoadableState.SUCCESS;
        break;
      case getType(EventsActions.newEvent.failure):
        draft.add = TLoadableState.ERROR;
    }
  });
};
