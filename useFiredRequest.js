import { useFiredHook } from "reactrequesting";
import useRequest from "./useRequest";

const useFiredRequest = (request, requestBody) => {
  const [fire, result] = useFiredHook(useRequest, request, requestBody);
  const fireWithRequestFunction = (requestBody) => {
    if (requestBody !== undefined) fire(request, requestBody);
    else fire();
  };
  return [fireWithRequestFunction, result];
};

export default useFiredRequest;
