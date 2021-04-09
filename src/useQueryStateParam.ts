import useQueryParams from './useQueryParams';
import { useEffect } from 'react';
import { SimpleObject } from './Types';

const useQueryStateParam = <P extends SimpleObject>(
  initialState?: P
): [
  SimpleObject,
  (newState: SimpleObject) => void,
  string | string[] | undefined
] => {
  const queryParams = useQueryParams();

  useEffect(() => {
    if (
      queryParams.get('s') === undefined &&
      !Array.isArray(queryParams.get('s')) &&
      initialState !== undefined
    ) {
      const encoded = btoa(JSON.stringify(initialState));
      queryParams.set(['s', encoded]);
    }
  }, []);

  const state =
    (!Array.isArray(queryParams.get('s')) &&
      queryParams.get('s') &&
      JSON.parse(atob(queryParams.get('s') as string))) ||
    initialState;

  const mergeQueryState = (newState: SimpleObject) => {
    const encoded = btoa(JSON.stringify({ ...state, ...newState }));
    queryParams.set(['s', encoded]);
  };

  return [state, mergeQueryState, queryParams.get('s')];
};

export default useQueryStateParam;
