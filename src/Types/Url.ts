import { QueryParams, SimpleObject } from './index';
import Property from './Property';
type Url = {
  path: QueryParams;
  query: QueryParams;
  state: SimpleObject;
  dispatch: (object: SimpleObject) => void;
  getPath: (path: string) => string | undefined;
  setQuery: (prop: Property) => void;
  setQueryIfUndefined: (key: string, value: string | undefined) => void;
  setQueryIfNotUndefined: (key: string, value: string | undefined) => void;
  deleteQuery: (key: string) => void;
  emit: (eventName: string, eventKey: string) => void;
};
export default Url;
