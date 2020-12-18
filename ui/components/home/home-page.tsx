import React from 'react';
import { Callout } from '@blueprintjs/core';

export const HomePage = () => {
  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Library Home</h1>
      <Callout title={'This is the Home page'}>Navigate to actions using links in sidebar</Callout>
    </>
  );
};
