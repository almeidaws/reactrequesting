import { useEffect, useState } from 'react';
import { HookParams, Neutralizable } from 'react-control-hooks';

const useRequest = <P extends HookParams, R>(
  args:
    | {
        requestFunction: (args?: P) => Promise<R>;
        requestBody?: Neutralizable<P>;
      }
    | {
        requestFunction: (args: P) => Promise<R>;
        requestBody?: Neutralizable<P>;
      }
): [R | null, Error | null] => {
  const requestFunction = args.requestFunction;
  const requestBody = args?.requestBody;
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (requestBody === null) {
      setResult(null);
      setError(null);
      return;
    }

    if (requestBody !== undefined)
      requestFunction(requestBody)
        .then(response => setResult(response))
        .catch(error => setError(error));

    return () => {
      setResult(null);
      setError(null);
    };
  }, [JSON.stringify(args.requestBody)]);

  return [result, error];
};

export default useRequest;
