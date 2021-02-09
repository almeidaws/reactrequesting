import useQueryParams from './useQueryParams';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const useUrl = () => {
	const queryParams = useQueryParams();
	const params = useParams();

	const getPath = (path) => {
		if (typeof path !== 'string')
			throw new Error("'path' should be of type string.");
		if (path.trim().length === 0) throw new Error("'path' can't be empty");
		return params[path];
	};

	const getQuery = (key) => {
		if (typeof key !== 'string')
			throw new Error("'key' should be of type string.");
		if (key.trim().length === 0) throw new Error("'key' can't be empty");
		return queryParams.get(key);
	};

	const setQuery = (key, value) => {
		if (typeof key !== 'string')
			throw new Error("'key' should be of type string.");
		if (key.trim().length === 0) throw new Error("'key' can't be empty");
		if (typeof value !== 'string' && value !== undefined)
			throw new Error("'value' should be of type string or undefined.");
		if (typeof value === 'string' && value.trim().length === 0)
			throw new Error("'value' can't be empty");
		queryParams.set(key, value);
	};

	const emit = (eventName, eventKey) => {
		if (eventKey === undefined) {
			setQuery(
				'event',
				`${eventName}.${Math.random().toString(36).substring(7)}`
			);
			return;
		}
		setQuery(
			'event',
			`${eventName}.${eventKey}.${Math.random().toString(36).substring(7)}`
		);
	};

	const deleteQuery = (key) => {
		if (typeof key !== 'string')
			throw new Error("'key' should be of type string.");
		if (key.trim().length === 0) throw new Error("'key' can't be empty");
		queryParams.set(key, undefined);
	};

	const setQueryIfUndefined = (key, value) => {
		if (typeof key !== 'string')
			throw new Error("'key' should be of type string.");
		if (key.trim().length === 0) throw new Error("'key' can't be empty");
		if (typeof value !== 'string' && value !== undefined)
			throw new Error("'value' should be of type string or undefined.");
		if (typeof value === 'string' && value.trim().length === 0)
			throw new Error("'value' can't be empty");
		queryParams.setIfUndefined(key, value);
	};

	const setQueryIfNotUndefined = (key, value) => {
		if (typeof key !== 'string')
			throw new Error("'key' should be of type string.");
		if (key.trim().length === 0) throw new Error("'key' can't be empty");
		if (typeof value !== 'string' && value !== undefined)
			throw new Error("'value' should be of type string or undefined.");
		if (typeof value === 'string' && value.trim().length === 0)
			throw new Error("'value' can't be empty");
		queryParams.setIfNotUndefined(key, value);
	};

	const openDialog = (dialog) => {
		if (typeof dialog !== 'string')
			throw new Error("'dialog' should be of type string.");
		if (dialog.trim().length === 0) throw new Error("'dialog' can't be empty");
		queryParams.set('dialog', dialog);
	};

	const isDialogOpened = (dialog) => {
		if (typeof dialog !== 'string')
			throw new Error("'dialog' should be of type string.");
		if (dialog.trim().length === 0) throw new Error("'dialog' can't be empty");
		return getQuery('dialog') === dialog;
	};

	const closeDialog = () => {
		queryParams.set('dialog', undefined);
	};
	/**
	 * @deprecated Since version 1.4.1 Will be deleted in version 2.0. Use useUrlEvent and useUrl.emit() together instead.
	 */
	const dispatchRefetch = (what) => {
		if (typeof what !== 'string')
			throw new Error("'what' should be of type string.");
		if (what.trim().length === 0) throw new Error("'what' can't be empty");
		queryParams.set('refetch', what);
	};
	/**
	 * @deprecated Since version 1.4.1 Will be deleted in version 2.0. Use useUrlEvent and useUrl.emit() together instead.
	 */
	const consumeRefetch = () => queryParams.set('refetch', undefined);

	useEffect(() => {
		queryParams.set('refetch', undefined);
	}, []);

	return {
		...params,
		...queryParams.getAll(),
		/**
		 * @deprecated Since version 1.6.0. Will be deleted in version 2.0. Use setQuery instead.
		 */
		openDialog,
		/**
		 * @deprecated Since version 1.6.0. Will be deleted in version 2.0. Use the return of the useUrl hook instead.
		 */
		isDialogOpened,
		/**
		 * @deprecated Since version 1.6.0. Will be deleted in version 2.0. Use deleteQuery instead.
		 */
		closeDialog,
		dispatchRefetch,
		consumeRefetch,
		getPath,
		setQuery,
		setQueryIfUndefined,
		setQueryIfNotUndefined,
		deleteQuery,
		emit,
	};
};

export default useUrl;
