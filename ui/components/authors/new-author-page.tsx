import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Button, InputGroup } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { useHistory } from 'react-router';
import { TStore } from '../../store/store';
import { TLoadable } from '../../utils/state.utils';
import { AuthorsThunks } from '../../actions/authors/authors.thunks';

export const NewAuthorPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isLoaded } = useSelector<TStore, TLoadable>(store => store.authors.add);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [birthDate, setBirthDate] = useState<Date>();
  const [deathDate, setDeathDate] = useState<Date>();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isLoaded && added) {
      history.push('/authors');
    }
  }, [isLoaded, added]);

  const onAddButtonClick = useCallback(() => {
    dispatch(AuthorsThunks.newAuthor({ firstName, lastName, patronymic, birthDate, deathDate }));
    setAdded(true);
  }, [firstName, lastName, patronymic, birthDate, deathDate]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">New Author</h1>
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
            onChange={date => setBirthDate(date)}
            parseDate={str => new Date(str)}
            placeholder={'DD.MM.YYYY'}
            maxDate={new Date()}
            minDate={new Date(1700, 1)}
            value={birthDate}
          />
        </Grid>
        <Grid item xs={5}>
          <div className="input-title offset-bottom-8">Death Date</div>
          <DateInput
            formatDate={date => date.toLocaleDateString()}
            onChange={date => setDeathDate(date)}
            parseDate={str => new Date(str)}
            placeholder={'DD.MM.YYYY'}
            maxDate={new Date()}
            value={deathDate}
          />
        </Grid>
        <Grid item xs={5}>
          <Button
            text={'Add Author'}
            intent={'primary'}
            disabled={!firstName || !lastName || !birthDate || isFetching}
            onClick={onAddButtonClick}
            className="offset-top-24"
          />
        </Grid>
      </Grid>
    </>
  );
};
