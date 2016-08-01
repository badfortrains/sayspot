/* @flow */

import spotcontrol from 'spotcontrol'
import * as types from '../constants/actionTypes'
import type { allActions } from '../constants/actionTypes'
import { AsyncStorage } from 'react-native'

//window.spotcontrol = spotcontrol
export const loginPassword = (username: string, password: string): allActions =>{
	return {
		meta: spotcontrol.login(username, password),
		type: types.LOGIN_PASSWORD
	}
}

export const loginCache = () : allActions => {
	let loginPromise = Promise.all([
		AsyncStorage.getItem('username'),
		AsyncStorage.getItem('blob')
	]).then(([username, blob]) => {
			if(username && blob) {
				return spotcontrol.loginBlob(username, blob)
			} else {
				return Promise.resolve("no credentials")
			}
	})
	return {
		meta: loginPromise,
		type: types.LOGIN_DISCOVERY
	}
}

export const loginDiscovery = (username: string, password: string): allActions => {
	let loginPromise = spotcontrol.startDiscovery()
			.then(({username, blob}) =>
				Promise.all([
					AsyncStorage.setItem('username', username),
					AsyncStorage.setItem('blob', blob)
				])
				.then(() => spotcontrol.loginBlob(username, blob))
			)

	return {
		meta: loginPromise,
		type: types.LOGIN_DISCOVERY
	}
}

export const toggleSettings = (): allActions => {
	return {
		type: types.TOGGLE_SETTINGS
	}
}
