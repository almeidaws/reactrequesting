import { useEffect, useState } from 'react';
import { HookParams, Neutralizable } from 'react-control-hooks';

const useRequest = <P extends HookParams, R>(args: {
  requestFunction: (args: P) => Promise<R>;
  requestBody: Neutralizable<P>;
}): [R | null, Error | null] => {
  const requestFunction = args?.requestFunction;
  const requestBody = args?.requestBody;
  const [result, setResult] = useState(null as R | null);
  const [error, setError] = useState(null as Error | null);

  useEffect(() => {
    if (args === null) {
      setResult(null);
      setError(null);
      return;
    }

    if (
      requestFunction !== undefined &&
      requestBody !== undefined &&
      requestBody !== null
    )
      requestFunction(requestBody)
        .then(response => setResult(response))
        .catch(error => setError(error));

    return () => {
      setResult(null);
      setError(null);
    };
  }, [
    args !== null && args !== undefined
      ? JSON.stringify(args.requestBody)
      : null,
  ]);

  return [result, error];
};

export default useRequest;
