import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TEvent, TStore } from '../../store/store';
import { TLoadableList } from '../../utils/state.utils';
import { EventsThunks } from '../../actions/events.thunks';
import { EventsTable } from './events-table';

export const EventsSearch = () => {
  const dispatch = useDispatch();

  const { entities: events, isFetching, isLoaded } = useSelector<TStore, TLoadableList<TEvent>>(
    store => store.events.search,
  );

  useEffect(() => {
    if (!events.length && !isFetching && !isLoaded) dispatch(EventsThunks.getEvents());
  }, [events, isFetching, isLoaded]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Events</h1>
      {!!events?.length && isLoaded ? (
        <EventsTable events={events} />
      ) : (
        <div className="offset-top-24 text-center">{isFetching ? 'Loading events...' : 'No events found'}</div>
      )}
    </>
  );
};
