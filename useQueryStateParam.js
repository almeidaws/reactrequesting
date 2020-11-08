import useQueryParams  from "./useQueryParams";
import { useEffect } from "react";

const useQueryStateParam = (initialState) => {
    const queryParams = useQueryParams();

    useEffect(() => {
        if (queryParams.get("s") === undefined && initialState !== undefined) {
            const encoded = btoa(JSON.stringify(initialState));
            queryParams.set("s", encoded);
        }
    }, []);

    const state =
        (queryParams.get("s") && JSON.parse(atob(queryParams.get("s")))) ||
        initialState;

    const mergeQueryState = (newState) => {
        if (state === null || state === undefined) {
            queryParams.set("s", undefined);
        } else {
            const encoded = btoa(JSON.stringify({ ...state, ...newState }));
            queryParams.set("s", encoded);
        }
    };

    return [state, mergeQueryState, queryParams.get("s")];
};

export default useQueryStateParam;
