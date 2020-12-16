import React from 'react';
import { useSelector } from 'react-redux';
import { TReader, TStore } from '../../store/store';
import { RouteComponentProps } from 'react-router';

export const ReaderPage = ({ match }: RouteComponentProps<{ id?: string }>) => {
  const reader = useSelector<TStore, TReader>(store => store.readersInfo[+match.params.id]);

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">{`${reader.firstName} ${reader.lastName} ${
        reader.patronymic ?? ''
      }`}</h1>
    </>
  );
};
