import { useFiredHook } from 'react-control-hooks';
import useRequest from './useRequest';
import { HookArgs, Hook } from 'react-control-hooks';

const useFiredRequest = <P, R>(
  request: (...args: HookArgs<P>) => R,
  requestBody: P
) => {
  const [fire, result] = useFiredHook<
    Hook<P>,
    ((...args: HookArgs<P>) => R) | P
  >(useRequest, request, requestBody);
  const fireWithRequestFunction = requestBody => {
    if (requestBody !== undefined) fire(request, requestBody);
    else fire();
  };
  return [fireWithRequestFunction, result];
};

export default useFiredRequest;
