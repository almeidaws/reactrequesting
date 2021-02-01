import { useScript } from "./index";
import { useFiredHook } from "reactcontrolhooks";
const useFiredScript = (script) => useFiredHook(useScript, script);
export default useFiredScript;
