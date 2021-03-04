import { QueryParams, SimpleObject } from './index';
import Property from './Property';
type Url = {
  path: QueryParams;
  query: QueryParams;
  state: SimpleObject;
  dispatch: (object: SimpleObject) => void;
  getPath: (path: string) => string | undefined;
  setQuery: (prop: Property) => void;
  setQueryIfUndefined: (prop: Property) => void;
  setQueryIfNotUndefined: (prop: Property) => void;
  deleteQuery: (key: string) => void;
  emit: (eventName: string, eventKey?: string) => void;
};
export default Url;
