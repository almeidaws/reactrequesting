import { useSkippableEffect } from "@dr.cash/controlhooks";
import { useState } from "react";
import { scripts } from "./scripts";

export const useScript = (script) => {
  const [pushedScript, setPushedScript] = useState(null);
  useSkippableEffect(() => {
    scripts.push(script);
    setPushedScript(script);
  }, [script]);
  return pushedScript;
};

export default useScript;
