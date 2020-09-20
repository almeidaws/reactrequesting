import { useFiredHook } from "@dr.cash/controlhooks";
import useRequest from "./useRequest";

const useFiredRequest = (request, requestBody) => {
  const [fire, result] = useFiredHook(useRequest, request, requestBody);
  const fireWithRequestFunction = (requestBody) => {
    if (requestBody) fire(request, requestBody);
    else fire();
  };
  return [fireWithRequestFunction, result];
};

export default useFiredRequest;
