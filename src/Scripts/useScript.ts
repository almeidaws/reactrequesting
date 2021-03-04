import { Neutralizable, useSkippableEffect } from 'react-control-hooks';
import { useState } from 'react';
import scripts from './scripts';
import { Url } from '../Types';

type Script = { previous: string; current: string; action: (url: Url) => void };

const useScript = (
  script: Neutralizable<Script>
): Neutralizable<Script> | null => {
  const [pushedScript, setPushedScript] = useState<Neutralizable<Script>>(null);
  useSkippableEffect(() => {
    if (typeof script !== 'function') return;
    scripts.push(script);
    setPushedScript(script);
  }, [script]);
  return pushedScript;
};

export default useScript;
