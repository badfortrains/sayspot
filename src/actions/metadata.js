/* @flow */

import spotcontrol from '../spotcontrol'
import * as types from '../constants/actionTypes'
import type { allActions } from '../constants/actionTypes'



export const spotSearch = (term: string): allActions =>{
	return {
		meta: spotcontrol.doSearch(term),
		type: types.SPOT_SEARCH
	}
}

export const spotSuggest= (term: string): allActions =>{
	return {
		meta: spotcontrol.doSuggest(term),
		type: types.SPOT_SUGGEST
	}
}
