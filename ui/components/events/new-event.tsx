import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Button, InputGroup } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { useHistory } from 'react-router';
import { TStore } from '../../store/store';
import { TLoadable } from '../../utils/state.utils';
import { EventsThunks } from '../../actions/events/events.thunks';

export const NewEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isLoaded } = useSelector<TStore, TLoadable>(store => store.events.add);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState<Date>();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isLoaded && added) {
      history.push('/events');
    }
  }, [isLoaded, added]);

  const onAddButtonClick = useCallback(() => {
    dispatch(EventsThunks.newEvent({ title, eventPlace: place, eventDate: date }));
    setAdded(true);
  }, [place, title, date]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">New Event</h1>
      <Grid container spacing={2} wrap={'wrap'} direction={'column'}>
        <Grid item xs={8}>
          <div className="input-title">Title</div>
          <InputGroup
            placeholder={'Title'}
            className="offset-top-8"
            value={title}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <div className="input-title">Place</div>
          <InputGroup
            placeholder={'Place'}
            className="offset-top-8"
            value={place}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setPlace(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <div className="input-title offset-bottom-8">Date</div>
          <DateInput
            formatDate={date => date.toLocaleDateString()}
            onChange={date => setDate(date)}
            parseDate={str => new Date(str)}
            placeholder={'DD.MM.YYYY'}
            value={date}
            highlightCurrentDay
          />
        </Grid>
        <Grid item xs={5}>
          <Button
            text={'Add Event'}
            intent={'primary'}
            disabled={!place || !title || !date || isFetching}
            onClick={onAddButtonClick}
            className="offset-top-24"
          />
        </Grid>
      </Grid>
    </>
  );
};
