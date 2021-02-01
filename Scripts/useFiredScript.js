import { useScript } from "./index";
import { useFiredHook } from "react-control-hooks";
const useFiredScript = (script) => useFiredHook(useScript, script);
export default useFiredScript;
