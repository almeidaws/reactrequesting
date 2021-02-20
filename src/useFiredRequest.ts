import { HookParams, Neutralizable, useFiredHook } from 'react-control-hooks';
import useRequest from './useRequest';

const useFiredRequest = <P extends HookParams, R>(
  args: Neutralizable<{
    requestFunction: (args: P) => Promise<R>;
    requestBody: P;
  }>
) => {
  const [fire, result] = useFiredHook(useRequest, args);
  const fireWithRequestFunction = (
    args: Neutralizable<{
      requestFunction: (args: P) => Promise<R>;
      requestBody: P;
    }>
  ) => {
    if (args !== undefined) fire(args);
    else fire();
  };
  return [fireWithRequestFunction, result];
};

export default useFiredRequest;
