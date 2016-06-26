/* @flow */

type asyncAction<actionType: string, T> =
	{type: actionType, payload?: T, status?: string, error?: Error, meta?: Promise<T>}

type syncAction<actionType: string, T> =
	{type: actionType, payload?: T, meta?: any}

export const LOGIN_PASSWORD = 'LOGIN_PASSWORD'
type loginPasswordAction = asyncAction<'LOGIN_PASSWORD', string>


export const LOGIN_DISCOVERY = 'LOGIN_DISCOVERY'
type loginDiscoveryAction = asyncAction<'LOGIN_DISCOVERY', string>


export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS'
type toggleSettingsAction = syncAction<'TOGGLE_SETTINGS', string>

export type allActions = loginPasswordAction | loginDiscoveryAction | toggleSettingsAction
