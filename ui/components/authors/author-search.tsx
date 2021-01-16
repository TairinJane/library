import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TAuthor, TStore } from '../../store/store';
import { TLoadableList } from '../../utils/state.utils';
import { AuthorsSearchControls } from './search-controls';
import { AuthorsTable } from './authors-table';
import { AuthorsActions } from '../../actions/authors/authors.actions';

export const AuthorsSearch = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { entities: authors, isFetching, isLoaded } = useSelector<TStore, TLoadableList<TAuthor>>(
    store => store.authors.search,
  );

  const onAuthorSelect = useCallback(
    (rowIndex: number) => {
      const author = authors[rowIndex];
      dispatch(AuthorsActions.saveAuthorInfo(author));
      history.push(`/authors/${author.id}`);
    },
    [authors],
  );

  return (
    <>
      <h1 className="bp3-heading offset-bottom-24">Authors Search</h1>
      <AuthorsSearchControls />
      {!!authors?.length && isLoaded ? (
        <AuthorsTable authors={authors} onRowClick={onAuthorSelect} />
      ) : (
        <div className="offset-top-24 text-center">{isFetching ? 'Authors are loading...' : 'No authors found'}</div>
      )}
    </>
  );
};
