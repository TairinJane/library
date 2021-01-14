export type TLoadable = {
  isFetching: boolean;
  isLoaded?: boolean;
  isError: boolean;
};

export const TLoadableState: Record<'SUCCESS' | 'REQUEST' | 'ERROR' | 'DEFAULT', TLoadable> = {
  SUCCESS: {
    isLoaded: true,
    isFetching: false,
    isError: false,
  },
  REQUEST: {
    isFetching: true,
    isError: false,
  },
  ERROR: {
    isError: true,
    isFetching: false,
  },
  DEFAULT: {
    isError: false,
    isLoaded: false,
    isFetching: false,
  },
};

export type TLoadableList<T> = {
  entities: T[];
} & TLoadable;

export function defaultLoadableList<T>(): TLoadableList<T> {
  return {
    entities: [],
    ...TLoadableState.DEFAULT,
  } as TLoadableList<T>;
}
