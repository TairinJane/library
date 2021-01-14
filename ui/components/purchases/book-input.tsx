import { Grid } from '@material-ui/core';
import { Button, InputGroup, NumericInput } from '@blueprintjs/core';
import React, { useState } from 'react';

type Props = {
  index: number;
  isbn: string;
  amount: number;
  onIsbnChange: (i: number, newIsbn: string) => void;
  onAmountChange: (i: number, newAmount: number) => void;
  deleteBook: (i: number) => void;
};

export const BookInput = ({ index, isbn, amount, onIsbnChange, onAmountChange, deleteBook }: Props) => {
  const [valid, setValid] = useState(true);
  return (
    <Grid container spacing={2} alignItems={'flex-end'}>
      <Grid item xs={6}>
        <div className="input-title offset-bottom-8">ISBN</div>
        <InputGroup
          placeholder={'ISBN'}
          className="offset-top-8"
          value={isbn}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            const intValue = parseInt(value, 10);
            if (value.length <= 13 && !isNaN(intValue)) onIsbnChange(index, intValue.toString());
            else if (value === '') onIsbnChange(index, value);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            if (e.currentTarget.value.length < 13) setValid(false);
            else setValid(true);
          }}
          intent={valid ? 'none' : 'danger'}
        />
      </Grid>
      <Grid item xs={5}>
        <div className="input-title offset-bottom-8">Amount</div>
        <NumericInput
          placeholder={'Amount'}
          className="offset-top-8"
          value={amount}
          onValueChange={value => onAmountChange(index, value)}
          min={1}
          max={100}
          minorStepSize={null}
          clampValueOnBlur
        />
      </Grid>
      <Grid item xs={1}>
        <Button onClick={() => deleteBook(index)} icon={'trash'} />
      </Grid>
    </Grid>
  );
};
