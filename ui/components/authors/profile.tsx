import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import { TAuthorProfile, TStore } from '../../store/store';
import { AuthorsThunks } from '../../actions/authors/authors.thunks';
import { personFullName } from '../../utils/title.utils';
import { AuthorBooksTable } from './author-books-table';
import { BookActions } from '../../actions/books/books.actions';

export const AuthorProfile = ({ match }: RouteComponentProps<{ id?: string }>) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authorId = +match.params.id;
  const { author, books } = useSelector<TStore, TAuthorProfile>(store => store.authors.profiles[authorId]) || {};

  useEffect(() => {
    if (!author) dispatch(AuthorsThunks.getAuthorInfo(authorId));
  }, [author, authorId]);

  useEffect(() => {
    if (!books) dispatch(AuthorsThunks.getAuthorBooks(authorId));
  }, [books, authorId]);

  const onBookSelect = useCallback(
    (rowIndex: number) => {
      const book = books[rowIndex];
      dispatch(BookActions.saveBookInfo(book));
      history.push(`/books/${book.id}`);
    },
    [books],
  );

  return !!author ? (
    <>
      <h1 className="bp3-heading offset-bottom-24">{personFullName(author)}</h1>
      <Grid container direction={'column'}>
        <Grid item>
          <span className="text-bold">Birth date:</span> {author.birthDate}
        </Grid>
        <Grid item>
          <span className="text-bold">Death date:</span> {author.deathDate ?? 'still alive'}
        </Grid>
      </Grid>
      <h2 className="bp3-heading offset-bottom-24 offset-top-24">Books</h2>
      {!!books?.length ? <AuthorBooksTable books={books} onRowClick={onBookSelect} /> : 'No books found'}
    </>
  ) : (
    <h1 className="bp3-heading offset-bottom-24">Author is loading...</h1>
  );
};
