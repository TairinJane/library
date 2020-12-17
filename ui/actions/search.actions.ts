import { createAction } from 'typesafe-actions';

const clearSearch = createAction('SEARCH/CLEAR_SEARCH')();

export const SearchActions = {
  clearSearch,
};
