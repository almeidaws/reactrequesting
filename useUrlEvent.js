import { useState } from "react";
import { useUrl } from "./index";
import { useSkippableEffect } from "react-control-hooks";

/**
* @deprecated Since version 1.6.0 Will be deleted in version 2.0. Use useListenUrlEvent() instead.
*/
const useUrlEvent = (name, id) => {
  const [consume, setConsume] = useState(null);
  const url = useUrl();
  useSkippableEffect(
    () => {
      const event = url.event.split(".");
      const eventName = event[0];
      const eventKey = event[1];
      if (eventName !== name) return;
      if (eventKey !== undefined && eventKey !== `${id}`) return;
      setConsume(() => () => url.deleteQuery("event"));
    },
    [url.event],
    [undefined]
  );

  return consume;
};

export default useUrlEvent;
