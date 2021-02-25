import { useState } from 'react';
import { useUrl } from './index';
import { useSkippableEffect } from 'react-control-hooks';

const useUrlEvent = (name: string, id?: string) => {
  const [consume, setConsume] = useState<(() => void) | null>(null);
  const url = useUrl();
  useSkippableEffect(
    () => {
      if (url.query.event === undefined) return;
      if (Array.isArray(url.query.event)) return;
      const [map] = url.query.event.split(';');
      const event = map.split('.');
      const eventName = event[0];
      const eventKey = event[1];
      if (eventName !== name) return;
      if (eventKey !== undefined && eventKey !== `${id}`) return;
      setConsume(() => () => url.deleteQuery('event'));
    },
    [url.query.event],
    [undefined]
  );

  return consume;
};

export default useUrlEvent;
