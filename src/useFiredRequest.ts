import { HookParams, Neutralizable, useFiredHook } from 'react-control-hooks';
import useRequest from './useRequest';

const useFiredRequest = <P extends HookParams, R>(args: {
  requestFunction: (args?: P) => Promise<R>;
  requestBody?: Neutralizable<P>;
}): [(requestBody?: Neutralizable<P>) => void, [R | null, Error | null]] => {
  const _useRequest = (
    innerArgs?: Neutralizable<{
      requestFunction: (args?: P) => Promise<R>;
      requestBody?: Neutralizable<P>;
    }>
  ) => {
    const requestBody = innerArgs === null ? null : innerArgs?.requestBody;
    return useRequest({ requestFunction: args.requestFunction, requestBody });
  };
  const [fire, result] = useFiredHook(_useRequest, {
    requestFunction: args.requestFunction,
    requestBody: args.requestBody,
  });
  const fireWithRequestFunction = (requestBody?: Neutralizable<P>) => {
    if (args !== undefined)
      fire({ requestFunction: args.requestFunction, requestBody });
    else fire();
  };
  return [fireWithRequestFunction, result];
};

export default useFiredRequest;
