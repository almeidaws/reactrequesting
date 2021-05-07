import { HookParams, Neutralizable, useFiredHook } from 'react-control-hooks';
import useRequest from './useRequest';

const useArgfulFiredRequest = <P extends HookParams, R>(
  requestFunction: (args: P) => Promise<R>
): {
  fire: (requestBody: Neutralizable<P>) => void;
  result: R | null;
  error: Error | null;
  isLoading: boolean;
  setResult: (responseBody: R | null) => void;
} => {
  const useRequestAdapter = (
    innerArgs?: Neutralizable<{
      requestFunction: (args: P) => Promise<R>;
      requestBody: Neutralizable<P>;
    }>
  ): {
    result: R | null;
    error: Error | null;
    isLoading: boolean;
    setResult: (responseBody: R | null) => void;
    refetch: () => void;
  } => {
    return useRequest({
      requestFunction: requestFunction,
      requestBody: innerArgs?.requestBody ?? null,
    });
  };
  const { fire, ...result } = useFiredHook(useRequestAdapter);
  const fireWithRequestFunction = (requestBody: Neutralizable<P>) => {
    fire({ requestFunction, requestBody });
  };
  return { fire: fireWithRequestFunction, ...result };
};

export default useArgfulFiredRequest;
