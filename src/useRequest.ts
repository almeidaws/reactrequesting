import { useEffect, useState } from 'react';
import { HookArgs } from 'react-control-hooks';

const useRequest = <P, R>(
  requestFunction: ((...args: HookArgs<P>) => R) | null,
  ...requestBody: P[]
): [R | null, Error | null] => {
  const [result, setResult] = useState(null as R | null);
  const [error, setError] = useState(null as Error | null);

  useEffect(() => {
    if (requestBody === null) {
      setResult(null);
      setError(null);
      return;
    }

    requestFunction?.(...requestBody)
      .then(response => setResult(response))
      .catch(error => setError(error));

    return () => {
      setResult(null);
      setError(null);
    };
  }, [requestBody]);
  return [result, error];
};

export default useRequest;
