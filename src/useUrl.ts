import useQueryParams from './useQueryParams';
import { useParams } from 'react-router-dom';
import useQueryStateParam from './useQueryStateParam';
import Property from './Types/Property';
import { SimpleObject } from './Types';

const useUrl = () => {
  const queryParams = useQueryParams();
  const params: { [key: string]: string | undefined } = useParams();
  const queryState = useQueryStateParam({});

  const dispatch = (object: SimpleObject) => queryState[1](object);

  const getPath = (path: string): string | undefined => {
    if (path.trim().length === 0) throw new Error("'path' can't be empty");
    return params[path];
  };

  const setQuery = (prop: Property) => {
    const [key, value] = prop;
    if (key.trim().length === 0) throw new Error("'key' can't be empty");
    if (typeof value === 'string' && value.trim().length === 0)
      throw new Error("'value' can't be empty");
    queryParams.set([key, value]);
  };

  const emit = (eventName: string, eventKey: string) => {
    const differentiator = Math.random()
      .toString(36)
      .substring(7);
    if (eventKey === undefined) {
      setQuery(['event', `${eventName};${differentiator}`]);
      return;
    }
    setQuery(['event', `${eventName}.${eventKey};${differentiator}`]);
  };

  const deleteQuery = (key: string) => {
    if (key.trim().length === 0) throw new Error("'key' can't be empty");
    queryParams.set([key, undefined]);
  };

  const setQueryIfUndefined = (key: string, value: string | undefined) => {
    if (key.trim().length === 0) throw new Error("'key' can't be empty");
    if (typeof value === 'string' && value.trim().length === 0)
      throw new Error("'value' can't be empty");
    queryParams.setIfUndefined([key, value]);
  };

  const setQueryIfNotUndefined = (key: string, value: string | undefined) => {
    if (key.trim().length === 0) throw new Error("'key' can't be empty");
    if (typeof value === 'string' && value.trim().length === 0)
      throw new Error("'value' can't be empty");
    queryParams.setIfNotUndefined([key, value]);
  };

  return {
    ...params,
    ...queryParams.getAll(),
    state: queryState[0],
    dispatch,
    getPath,
    setQuery,
    setQueryIfUndefined,
    setQueryIfNotUndefined,
    deleteQuery,
    emit,
  };
};

export default useUrl;
