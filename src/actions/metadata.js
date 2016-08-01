/* @flow */

import spotcontrol from 'spotcontrol'
import * as types from '../constants/actionTypes'
import type { allActions } from '../constants/actionTypes'



export const spotSearch = (term: string): allActions =>{
	return {
		type: types.SPOT_SEARCH,
		meta: spotcontrol.doSearch(term)
	}
}

export const spotSuggest= (term: string): allActions =>{
	return {
		type: types.SPOT_SUGGEST,
		meta: spotcontrol.doSuggest(term),
	}
}
