import React from 'react';
import { Button } from '@blueprintjs/core';
import { Grid } from '@material-ui/core';

export const BooksPage = () => {
  return (
    <Grid container spacing={2} alignItems={'center'} justify={'center'}>
      <div>Some text</div>
      <Grid item>
        <Button>Button 1</Button>
      </Grid>
      <Grid item>
        <Button>Button 2</Button>
      </Grid>
    </Grid>
  );
};
