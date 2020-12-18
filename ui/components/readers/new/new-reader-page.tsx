import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Button, InputGroup } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { ReadersThunks } from '../../../actions/readers.thunks';
import { TStore } from '../../../store/store';
import { TLoadable } from '../../../utils/state.utils';
import { ReadersActions } from '../../../actions/readers.actions';
import { useHistory } from 'react-router';

export const NewReaderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isLoaded } = useSelector<TStore, TLoadable>(store => store.readers.add);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (isLoaded) {
      dispatch(ReadersActions.addStateToDefault());
      history.push('/');
    }
  }, [isLoaded]);

  const onAddButtonClick = useCallback(() => {
    console.log(firstName, lastName, patronymic, date);
    dispatch(ReadersThunks.addNewReader(firstName, lastName, date, patronymic));
  }, [firstName, lastName, patronymic, date]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">New Reader</h1>
      <Grid container spacing={2} wrap={'wrap'} direction={'column'}>
        <Grid item xs={5}>
          <div className="input-title">First Name</div>
          <InputGroup
            placeholder={'First Name'}
            className="offset-top-8"
            value={firstName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <div className="input-title">Last Name</div>
          <InputGroup
            placeholder={'Last Name'}
            className="offset-top-8"
            value={lastName}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <div className="input-title">Patronymic</div>
          <InputGroup
            placeholder={'Patronymic'}
            className="offset-top-8"
            value={patronymic}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setPatronymic(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={5}>
          <div className="input-title offset-bottom-8">Birth Date</div>
          <DateInput
            formatDate={date => date.toLocaleDateString()}
            onChange={date => setDate(date)}
            parseDate={str => new Date(str)}
            placeholder={'DD.MM.YYYY'}
            maxDate={new Date()}
            value={date}
          />
        </Grid>
        <Grid item xs={5}>
          <Button
            text={'Add Reader'}
            intent={'primary'}
            disabled={!firstName || !lastName || !date || isFetching}
            onClick={onAddButtonClick}
          />
        </Grid>
      </Grid>
    </>
  );
};
