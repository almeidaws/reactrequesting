import { useScript } from './index';
import { useFiredHook } from 'react-control-hooks';
const useFiredScript = () => useFiredHook(useScript);
export default useFiredScript;
