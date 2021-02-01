import { useScript } from "./index";
const { useFiredHook } = from "@dr.cash/controlhooks";
const useFiredScript = (script) => useFiredHook(useScript, script);
export default useFiredScript;
