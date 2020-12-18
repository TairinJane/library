import { Dispatch } from 'redux';
import { SearchActions } from './search.actions';
import { SearchApi } from '../api/search.api';

const getPurchases = () => {
  return (dispatch: Dispatch) => {
    dispatch(SearchActions.getPurchases.request());
    return SearchApi.getPurchases()
      .then(json => dispatch(SearchActions.getPurchases.success(json)))
      .catch(() => dispatch(SearchActions.getPurchases.failure()));
  };
};

export const SearchThunks = {
  getPurchases,
};
