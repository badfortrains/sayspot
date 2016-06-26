/* @flow */

import spotcontrol from '../spotcontrol'
import * as types from '../constants/actionTypes'
import type { allActions } from '../constants/actionTypes'

//window.spotcontrol = spotcontrol
export const loginPassword = (username: string, password: string): allActions =>{
	return {
		meta: spotcontrol.login(username, password),
		type: types.LOGIN_PASSWORD
	}
}

export const loginDiscovery = (username: string, password: string): allActions => {
	return {
		meta: spotcontrol.startDiscovery(),
		type: types.LOGIN_DISCOVERY
	}
}

export const toggleSettings = (): allActions => {
	return {
		type: types.TOGGLE_SETTINGS
	}
}
