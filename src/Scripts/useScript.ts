import { Neutralizable, useSkippableEffect } from 'react-control-hooks';
import { useState } from 'react';
import scripts from './scripts';
import { Url } from '../Types';

type Script = { previous: string; current: string; action: (url: Url) => void };

const useScript = (
  script?: Neutralizable<Script>
): { createdScript: Script | null } => {
  const [pushedScript, setPushedScript] = useState<Neutralizable<Script>>(null);
  useSkippableEffect(() => {
    if (script === null) return;
    if (script === undefined) return;
    scripts.push(script);
    setPushedScript(script);
  }, [script]);
  return { createdScript: pushedScript };
};

export default useScript;
