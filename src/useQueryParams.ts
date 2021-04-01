import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useState, useEffect } from 'react';
import Property from './Types/Property';
import QueryParams from './Types/QueryParams';
import { isProperties, isProperty } from './Types';

const useQueryParams = () => {
  const history = useHistory();

  const setParam = (
    name: string,
    value: string | string[] | undefined,
    currentParams: QueryParams
  ): QueryParams => {
    if (value === undefined) {
      const withoutParam = { ...currentParams, [name]: undefined };
      const isTheLastParam =
        Object.values(withoutParam).filter(value => value !== undefined)
          .length === 0;
      if (isTheLastParam) {
        history.replace(window.location.pathname);
      } else {
        history.replace(
          `${window.location.pathname}?${queryString.stringify(withoutParam)}`
        );
      }
      return withoutParam;
    } else {
      const withParam: QueryParams = { ...currentParams, [name]: value };
      history.replace(
        `${window.location.pathname}?${queryString.stringify(withParam)}`
      );
      return withParam;
    }
  };

  const setParams = (params: Property[]) => {
    let newParams = queryString.parse(window.location.search);
    const queryParams = Object.entries(newParams).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name]: value === null ? undefined : value,
      }),
      {}
    );
    params.reduce(
      (acc, [name, value]) => setParam(name, value, acc),
      queryParams
    );
  };

  const set = (prop: Property | Property[]) => {
    if (isProperty(prop)) set([prop]);
    else setParams(prop);
  };

  const setIf = (
    prop: Property | Property[],
    predicate: ([name]: Property) => boolean
  ) => {
    if (isProperties(prop)) {
      const unsetted = prop.filter(predicate);
      set(unsetted);
    } else {
      setIfUndefined([prop]);
    }
  };

  const setIfUndefined = (prop: Property | Property[]) => {
    const queryParams = queryString.parse(window.location.search);
    return setIf(prop, ([name]) => queryParams[name] === undefined);
  };

  const setIfNotUndefined = (prop: Property | Property[]) => {
    console.warn(
      "'setIfNotUndefined' from 'useQueryParams' wasn't tested. If it worked, please remove this warning."
    );
    const queryParams = queryString.parse(window.location.search);
    return setIf(prop, ([name]) => queryParams[name] !== undefined);
  };

  const getAll = (): QueryParams => {
    const currentParams = queryString.parse(window.location.search);
    return Object.entries(currentParams).reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name]: value === null ? undefined : value,
      }),
      {}
    );
  };

  const get = (prop: string): string | string[] | undefined => {
    const queryParams = getAll();
    return queryParams[prop];
  };

  const [paramAccessors, setParamAccessors] = useState({
    set,
    setIfUndefined,
    setIfNotUndefined,
    get,
    getAll,
  });

  useEffect(() => {
    setParamAccessors({
      set,
      setIfUndefined,
      setIfNotUndefined,
      get,
      getAll,
    });
  }, [window.location.search]);

  return paramAccessors;
};

export default useQueryParams;
