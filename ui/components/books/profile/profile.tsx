import React from 'react';
import { RouteComponentProps } from 'react-router';
import { GeneralInfo } from './general-info';
import { HistorySection } from './history-section';
import { ReservedSection } from './reserved-section';

export const BookProfile = ({ match }: RouteComponentProps<{ id?: string }>) => {
  const bookId = +match.params.id;

  return (
    <>
      <GeneralInfo bookId={bookId} />
      <HistorySection bookId={bookId} />
      <ReservedSection bookId={bookId} />
    </>
  );
};
