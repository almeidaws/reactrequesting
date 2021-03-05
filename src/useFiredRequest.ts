import { HookParams, Neutralizable, useFiredHook } from 'react-control-hooks';
import useRequest from './useRequest';

const useFiredRequest = <P extends HookParams, R>(
  requestFunction: ((args?: P) => Promise<R>) | ((args: P) => Promise<R>)
): [
  (
    | ((requestBody?: Neutralizable<P>) => void)
    | ((requestBody: Neutralizable<P>) => void)
  ),
  [R | null, Error | null]
] => {
  const _useRequest = (
    innerArgs?: Neutralizable<
      | {
          requestFunction: (args?: P) => Promise<R>;
          requestBody?: Neutralizable<P>;
        }
      | {
          requestFunction: (args: P) => Promise<R>;
          requestBody?: Neutralizable<P>;
        }
    >
  ) => {
    const requestBody = innerArgs === null ? null : innerArgs?.requestBody;
    return useRequest({ requestFunction: requestFunction, requestBody });
  };
  const [fire, result] = useFiredHook(_useRequest);
  const fireWithRequestFunction = (requestBody?: Neutralizable<P>) => {
    fire({ requestFunction: requestFunction, requestBody });
  };
  return [fireWithRequestFunction, result];
};

export default useFiredRequest;
