import { useScript } from "./index";
import { useFiredHook } from "reactrequesting";
const useFiredScript = (script) => useFiredHook(useScript, script);
export default useFiredScript;
