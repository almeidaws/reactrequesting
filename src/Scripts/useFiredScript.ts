import { useFiredHook } from 'react-control-hooks';
import useScript from './useScript';
const useFiredScript = () => useFiredHook(useScript);
export default useFiredScript;
