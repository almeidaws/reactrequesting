import { Neutralizable, useFiredHook } from 'react-control-hooks';
import useRequest from './useRequest';

const useArglessFiredRequest = <R>(
  requestFunction: () => Promise<R>
): {
  fire: (requestBody?: null) => void;
  result: R | null;
  error: Error | null;
  isLoading: boolean;
  setResult: (responseBody: R | null) => void;
} => {
  const useRequestAdapter = (
    innerArgs?: Neutralizable<{
      requestFunction: () => Promise<R>;
      requestBody?: null;
    }>
  ): {
    result: R | null;
    error: Error | null;
    isLoading: boolean;
    setResult: (responseBody: R | null) => void;
    refetch: () => void;
  } => {
    const requestBody =
      innerArgs === undefined ? undefined : innerArgs?.requestBody;
    return useRequest({ requestFunction: requestFunction, requestBody });
  };
  const { fire, ...result } = useFiredHook(useRequestAdapter);
  const fireWithRequestFunction = (requestBody?: null) => {
    fire({ requestFunction, requestBody });
  };
  return { fire: fireWithRequestFunction, ...result };
};

export default useArglessFiredRequest;
