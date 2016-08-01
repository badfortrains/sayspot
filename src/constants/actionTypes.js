/* @flow */
import type { SearchResult, SuggestResult } from 'spotcontrol'

type asyncAction<actionType: string, T> =
	{type: actionType, payload?: T, status?: string, error?: Error, meta: Promise<T>}

type syncAction<actionType: string, T> =
	{type: actionType, payload?: T, meta?: any}

//HACK, flow currently has problems with void generic types for optional
// properties on disjoint union tyes. Make string so flow won't complain
// about it missing
type noPayload = any

export const LOGIN_PASSWORD = 'LOGIN_PASSWORD'
type loginPasswordAction = asyncAction<'LOGIN_PASSWORD', string>


export const LOGIN_DISCOVERY = 'LOGIN_DISCOVERY'
type loginDiscoveryAction = asyncAction<'LOGIN_DISCOVERY', string>


export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS'
type toggleSettingsAction = syncAction<'TOGGLE_SETTINGS', string>


export type navigatePayload = {key: string}
export const NAVIGATE_TO = 'NAVIGATE_TO'
type navigateToAction = syncAction<'NAVIGATE_TO', navigatePayload>

export const NAVIGATE_BACK = 'NAVIGATE_BACK'
type navigateBackAction = syncAction<'NAVIGATE_BACK', noPayload>

export const SPOT_SEARCH = 'SPOT_SEARCH'
type spotSearchAction = asyncAction<'SPOT_SEARCH', SearchResult>

export const SPOT_SUGGEST = 'SPOT_SUGGEST'
type spotSuggestAction = asyncAction<'SPOT_SUGGEST', SuggestResult>

export type allActions =
		loginPasswordAction |
		loginDiscoveryAction |
		toggleSettingsAction |
		navigateToAction |
		navigateBackAction |
		spotSearchAction |
		spotSuggestAction;
