import useQueryParams from './useQueryParams';
import { useParams } from 'react-router-dom';
import useQueryStateParam from './useQueryStateParam';
import Property from './Types/Property';
import { SimpleObject, Url } from './Types';
import { useMemo } from 'react';

const useUrl = (): Url => {
  const queryParams = useQueryParams();
  const params: { [key: string]: string | undefined } = useParams();
  const queryState = useQueryStateParam();
  const dispatch = useMemo(
    () => (object: SimpleObject) => queryState[1](object),
    []
  );
  const getPath = useMemo(
    () => (path: string): string | undefined => {
      if (path.trim().length === 0) throw new Error("'path' can't be empty");
      return params[path];
    },
    [params]
  );

  const setQuery = useMemo(
    () => (prop: Property) => {
      const [key, value] = prop;
      if (key.trim().length === 0) throw new Error("'key' can't be empty");
      if (typeof value === 'string' && value.trim().length === 0)
        throw new Error("'value' can't be empty");
      queryParams.set([key, value]);
    },
    [queryParams]
  );

  const emit = useMemo(
    () => (eventName: string, eventKey?: string) => {
      const differentiator = Math.random()
        .toString(36)
        .substring(7);
      if (eventKey === undefined) {
        setQuery(['event', `${eventName};${differentiator}`]);
        return;
      }
      setQuery(['event', `${eventName}.${eventKey};${differentiator}`]);
    },
    [setQuery]
  );

  const deleteQuery = useMemo(
    () => (key: string) => {
      if (key.trim().length === 0) throw new Error("'key' can't be empty");
      queryParams.set([key, undefined]);
    },
    [queryParams]
  );

  const setQueryIfUndefined = useMemo(
    () => ([key, value]: Property) => {
      if (key.trim().length === 0) throw new Error("'key' can't be empty");
      if (typeof value === 'string' && value.trim().length === 0)
        throw new Error("'value' can't be empty");
      queryParams.setIfUndefined([key, value]);
    },
    [queryParams]
  );

  const setQueryIfNotUndefined = useMemo(
    () => ([key, value]: Property) => {
      if (key.trim().length === 0) throw new Error("'key' can't be empty");
      if (typeof value === 'string' && value.trim().length === 0)
        throw new Error("'value' can't be empty");
      queryParams.setIfNotUndefined([key, value]);
    },
    [queryParams]
  );

  return useMemo(
    () => ({
      path: params,
      query: queryParams.getAll(),
      state: queryState[0],
      dispatch,
      getPath,
      setQuery,
      setQueryIfUndefined,
      setQueryIfNotUndefined,
      deleteQuery,
      emit,
    }),
    [
      JSON.stringify(params),
      JSON.stringify(queryParams.getAll()),
      JSON.stringify(queryState[0]),
    ]
  );
};

export default useUrl;
