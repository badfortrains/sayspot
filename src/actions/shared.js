// @flow

import type { allActions } from '../constants/actionTypes.js'

export const asyncMiddleware = (store: Object): Function =>
(next: Function): Function => (action: allActions): any => {
	let payloadPromise = action.meta
	if (!payloadPromise || !typeof payloadPromise.then === 'function') {
		return next(action)
	}

	store.dispatch({type: action.type, status: 'loading'})
	payloadPromise.then(payload =>
		store.dispatch({type: action.type,payload: payload,status: 'success'}))
	.catch(err => store.dispatch({type: action.type, status: 'error', error: err}))
}
