import { useScript } from './index';
import { Neutralizable, useFiredHook } from 'react-control-hooks';
import { Url } from '../Types';
const useFiredScript = (script: Neutralizable<(url: Url) => void>) =>
  useFiredHook(useScript, script);
export default useFiredScript;
