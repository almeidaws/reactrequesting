import { useEffect, useState } from "react";
import { useUrl } from "../index";
import _ from "lodash";
import { scripts } from "./scripts";

const matches = (previous, params) => {
  const entries = Object.entries(previous);
  const matches = entries.filter(([key, value]) => params[key] === value);
  return matches.length === entries.length;
};

const useRunPendingScripts = () => {
  const url = useUrl();
  const params = Object.entries(url)
    .filter((entry) => typeof entry[1] === "string" || entry[1] === undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  const paramsAsString = JSON.stringify(params);
  const [previousParams, setPreviousParams] = useState(params);

  useEffect(() => {
    const [pending, remaining] = _.partition(
      scripts,
      ({ previous, current }) =>
        matches(previous, previousParams) && matches(current, params)
    );
    setPreviousParams(params);
    while (scripts.length > 0) scripts.pop();
    while (remaining.length > 0) scripts.push(remaining.pop());
    pending.forEach(({ action }) => action(url));
  }, [paramsAsString]);
};

export default useRunPendingScripts;
