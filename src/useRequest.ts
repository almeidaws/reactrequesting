import { useEffect, useMemo, useState } from 'react';
import { HookParams, Neutralizable } from 'react-control-hooks';

const useRequest = <P extends HookParams, R>(
  args:
    | {
        requestFunction: () => Promise<R>;
        requestBody?: null;
      }
    | {
        requestFunction: (args: P) => Promise<R>;
        requestBody: Neutralizable<P>;
      }
): {
  result: R | null;
  error: Error | null;
  isLoading: boolean;
  setResult: (responseBody: R | null) => void;
  refetch: () => void;
} => {
  const requestFunction = args.requestFunction;
  const requestBody = args?.requestBody;
  const [{ result, error, isLoading }, setResponse] = useState<{
    result: R | null;
    error: Error | null;
    isLoading: boolean;
  }>({ result: null, error: null, isLoading: true });
  const setResult = useMemo(
    () => (requestBody: R | null) => {
      setResponse(({ error, isLoading }) => ({
        result: requestBody,
        error,
        isLoading,
      }));
    },
    []
  );
  const [count, setCount] = useState(0);
  const refetch = useMemo(
    () => () => {
      setCount(prev => prev + 1);
    },
    []
  );

  useEffect(() => {
    if (requestBody === null) {
      setResponse({ result: null, error: null, isLoading: false });
      return;
    }

    setResponse(({ result, error }) => ({ result, error, isLoading: true }));
    const request = () =>
      requestFunction.length === 0
        ? (requestFunction as () => Promise<R>)()
        : requestFunction(requestBody as P);
    request()
      .then(response =>
        setResponse(({ error }) => ({
          result: response,
          error,
          isLoading: false,
        }))
      )
      .catch(error =>
        setResponse(({ result }) => ({ result, error, isLoading: false }))
      );
  }, [JSON.stringify(args.requestBody), count]);

  return { result, error, isLoading, setResult, refetch };
};

export default useRequest;
