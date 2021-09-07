import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Button, InputGroup } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { useHistory } from 'react-router';
import { TPurchaseBook, TStore } from '../../store/store';
import { TLoadable } from '../../utils/state.utils';
import { BookInput } from './book-input';
import { PurchasesThunks } from '../../actions/purchases/purchases.thunks';

const emptyBook: TPurchaseBook = { isbn: '', amount: 1 };

export const NewPurchasePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isLoaded } = useSelector<TStore, TLoadable>(store => store.purchases.add);
  const [supplier, setSupplier] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [books, setBooks] = useState<TPurchaseBook[]>([emptyBook]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isLoaded && added) {
      history.push('/purchases');
    }
  }, [isLoaded, added]);

  const onAddButtonClick = useCallback(() => {
    if (books.every(book => book.isbn.length == 13)) {
      dispatch(
        PurchasesThunks.newPurchase({
          supplier,
          deliveryDate,
          books,
        }),
      );
      setAdded(true);
    }
  }, [supplier, deliveryDate, books]);

  const addBook = useCallback(() => {
    setBooks(books => [...books, emptyBook]);
  }, []);

  const deleteBook = useCallback((i: number) => {
    if (i != 0) setBooks(books => [...books.slice(0, i).concat(books.slice(i + 1))]);
  }, []);

  const updateBookIsbn = useCallback(
    (i: number, newIsbn: string) => {
      const booksToUpdate = [...books];
      booksToUpdate[i] = {
        ...booksToUpdate[i],
        isbn: newIsbn,
      };
      setBooks(booksToUpdate);
    },
    [books],
  );

  const updateBookAmount = useCallback(
    (i: number, newAmount: number) => {
      const booksToUpdate = [...books];
      booksToUpdate[i] = {
        ...booksToUpdate[i],
        amount: newAmount,
      };
      setBooks(booksToUpdate);
    },
    [books],
  );

  return (
    <>
      <h1 className="bp3-heading">New Purchase</h1>
      <Grid container spacing={2} wrap={'wrap'} direction={'column'}>
        <Grid item xs={12}>
          <h3 className="bp3-heading offset-top-24">General Info</h3>
        </Grid>
        <Grid item xs={12} md={9}>
          <div className="input-title">Supplier</div>
          <InputGroup
            placeholder={'Supplier'}
            className="offset-top-8"
            value={supplier}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSupplier(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <div className="input-title offset-bottom-8">Delivery Date</div>
          <DateInput
            formatDate={date => date.toLocaleDateString()}
            onChange={date => setDeliveryDate(date)}
            parseDate={str => new Date(str)}
            placeholder={'DD.MM.YYYY'}
            minDate={new Date()}
            value={deliveryDate}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2} justify={'space-between'} alignItems={'flex-end'}>
            <Grid item>
              <h3 className="bp3-heading offset-top-24">Books</h3>
            </Grid>
            <Grid item>
              <Button intent={'success'} onClick={addBook} icon={'plus'} outlined />
            </Grid>
          </Grid>
          {books.map((book, index) => (
            <BookInput
              key={index}
              index={index}
              isbn={book.isbn}
              amount={book.amount}
              onIsbnChange={updateBookIsbn}
              onAmountChange={updateBookAmount}
              deleteBook={deleteBook}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            text={'Add Purchase'}
            intent={'primary'}
            disabled={!supplier || !deliveryDate || isFetching}
            onClick={onAddButtonClick}
            className="offset-top-24"
          />
        </Grid>
      </Grid>
    </>
  );
};
