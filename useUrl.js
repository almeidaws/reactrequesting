import useQueryParams from "./useQueryParams";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useUrl = () => {
    const queryParams = useQueryParams();
    const params = useParams();

    const getPath = (path) => {
        if (typeof path !== "string")
            throw new Error("'path' should be of type string.");
        if (path.trim().length === 0) throw new Error("'path' can't be empty");
        return params[path];
    };

    const getQuery = (key) => {
        if (typeof key !== "string")
            throw new Error("'key' should be of type string.");
        if (key.trim().length === 0) throw new Error("'key' can't be empty");
        return queryParams.get(key);
    };

    const setQuery = (key, value) => {
        if (typeof key !== "string")
            throw new Error("'key' should be of type string.");
        if (key.trim().length === 0) throw new Error("'key' can't be empty");
        if (typeof value !== "string" && value !== undefined)
            throw new Error("'value' should be of type string or undefined.");
        if (typeof value === "string" && value.trim().length === 0)
            throw new Error("'value' can't be empty");
        queryParams.set(key, value);
    };

    const setQueryIfUndefined = (key, value) => {
        if (typeof key !== "string")
            throw new Error("'key' should be of type string.");
        if (key.trim().length === 0) throw new Error("'key' can't be empty");
        if (typeof value !== "string" && value !== undefined)
            throw new Error("'value' should be of type string or undefined.");
        if (typeof value === "string" && value.trim().length === 0)
            throw new Error("'value' can't be empty");
        queryParams.setIfUndefined(key, value);
    }

    const setQueryIfNotUndefined = (key, value) => {
        if (typeof key !== "string")
            throw new Error("'key' should be of type string.");
        if (key.trim().length === 0) throw new Error("'key' can't be empty");
        if (typeof value !== "string" && value !== undefined)
            throw new Error("'value' should be of type string or undefined.");
        if (typeof value === "string" && value.trim().length === 0)
            throw new Error("'value' can't be empty");
        queryParams.setIfNotUndefined(key, value);
    }

    const openDialog = (dialog) => {
        if (typeof dialog !== "string")
            throw new Error("'dialog' should be of type string.");
        if (dialog.trim().length === 0) throw new Error("'dialog' can't be empty");
        setQuery("dialog", dialog);
    };

    const isDialogOpened = (dialog) => {
        if (typeof dialog !== "string")
            throw new Error("'dialog' should be of type string.");
        if (dialog.trim().length === 0) throw new Error("'dialog' can't be empty");
        return getQuery("dialog") === dialog;
    };

    const closeDialog = (dialog) => {
        if (typeof dialog !== "string")
            throw new Error("'dialog' should be of type string.");
        if (dialog.trim().length === 0) throw new Error("'dialog' can't be empty");
        queryParams.set("dialog", undefined);
        setQuery("dialog", undefined);
    };

    const dispatchRefetch = (what) => {
        if (typeof what !== "string")
            throw new Error("'what' should be of type string.");
        if (what.trim().length === 0) throw new Error("'what' can't be empty");
        setQuery("refetch", what);
    };

    const consumeRefetch = (what) => {
        if (typeof what !== "string")
            throw new Error("'what' should be of type string.");
        if (what.trim().length === 0) throw new Error("'what' can't be empty");
        setQuery("refetch", undefined);
    };

    useEffect(() => {
        setQuery("refetch", undefined);
    }, []);

    return {
        ...params,
        ...queryParams.getAll(),
        openDialog,
        isDialogOpened,
        closeDialog,
        dispatchRefetch,
        consumeRefetch,
        getPath,
        setQuery,
        setQueryIfUndefined,
        setQueryIfNotUndefined
    };
};

export default useUrl;
