// @flow
import { NavigationExperimental } from 'react-native'
import type { allActions, navigatePayload } from '../constants/actionTypes.js'
import { SPOT_SEARCH, SPOT_SUGGEST } from '../constants/actionTypes.js'

const { StateUtils: NavigationStateUtils} = NavigationExperimental;

let initialState = {
  status: 'initial',
  suggest: null,
  search: null
}

export default (state: Object = initialState, action: allActions) : Object => {
  if (action.type === SPOT_SEARCH) {
    state = {
      ...state,
      search: action.payload
    }
  } else if (action.type === SPOT_SUGGEST) {
    state = {
      ...state,
      suggest: action.payload
    }
  }
  return state
}
