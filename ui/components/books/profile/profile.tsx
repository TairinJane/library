import React from 'react';
import { RouteComponentProps } from 'react-router';
import { GeneralInfo } from './sections/general-info';
import { HistorySection } from './sections/history-section';
import { ReservedSection } from './sections/reserved-section';

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
