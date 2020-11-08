import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { useState, useEffect } from "react";

const useQueryParams = () => {
    const history = useHistory();

    const setParam = (name, value, currentParams) => {
        const isRemovingParam =
            value === undefined || value === null || value === "";
        if (isRemovingParam) {
            const withoutParam = { ...currentParams, [name]: undefined };
            const isTheLastParam =
                Object.values(withoutParam).filter((value) => value !== undefined)
                    .length === 0;
            if (isTheLastParam) {
                history.replace(window.location.pathname);
            } else {
                history.replace(
                    `${window.location.pathname}?${queryString.stringify(withoutParam)}`
                );
            }
            return withoutParam;
        } else {
            const withParam = { ...currentParams, [name]: value };
            history.replace(
                `${window.location.pathname}?${queryString.stringify(withParam)}`
            );
            return withParam;
        }
    };

    const setParams = (params) => {
        let newParams = queryString.parse(window.location.search);
        params.forEach(([name, value]) => {
            newParams = setParam(name, value, newParams);
        });
    };

    const set = (nameOrArray, value) => {
        if (Array.isArray(nameOrArray)) setParams(nameOrArray);
        else set([[nameOrArray, value]]);
    };

    const setIf = (nameOrArray, value, predicate) => {
        if (Array.isArray(nameOrArray)) {
            const unsetted = nameOrArray.filter(predicate);
            set(unsetted);
        } else {
            setIfUndefined([[nameOrArray, value]]);
        }
    };

    const setIfUndefined = (nameOrArray, value) => {
        const queryParams = queryString.parse(window.location.search);
        return setIf(
            nameOrArray,
            value,
            ([name]) => queryParams[name] === undefined
        );
    };

    const setIfNotUndefined = (nameOrArray, value) => {
        console.warn(
            "'setIfNotUndefined' from 'useQueryParams' wasn't tested. If it worked, please remove this warning."
        );
        const queryParams = queryString.parse(window.location.search);
        return setIf(
            nameOrArray,
            value,
            ([name]) => queryParams[name] !== undefined
        );
    };

    const get = (nameOrArray, defaultValue) => {
        const queryParams = queryString.parse(window.location.search);
        if (Array.isArray(nameOrArray)) {
            return nameOrArray.map((nameOrTuple) =>
                Array.isArray(nameOrTuple)
                    ? queryParams[nameOrTuple[0]] || nameOrTuple[1]
                    : queryParams[nameOrTuple]
            );
        } else {
            return queryParams[nameOrArray] || defaultValue;
        }
    };

    const [paramAccessors, setParamAccessors] = useState({
        set,
        setIfUndefined,
        setIfNotUndefined,
        get,
    });

    useEffect(() => {
        setParamAccessors({
            set,
            setIfUndefined,
            setIfNotUndefined,
            get,
        });
    }, [window.location.search]);

    return paramAccessors;
};

export default useQueryParams;
