import { useEffect, useState } from 'react';
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
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [refetch] = useState(() => () => {
    setCount(prev => prev + 1);
  });

  useEffect(() => {
    if (requestBody === null) {
      setResult(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const request = () =>
      requestFunction.length === 0
        ? (requestFunction as () => Promise<R>)()
        : requestFunction(requestBody as P);
    request()
      .then(response => setResult(response))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [JSON.stringify(args.requestBody), count]);

  return { result, error, isLoading, setResult, refetch };
};

export default useRequest;
