// @flow

import * as NavigationExperimental from '../lib/NavigationExperimental'
import type { allActions, navigatePayload } from '../constants/actionTypes.js'
import { NAVIGATE_TO, NAVIGATE_BACK } from '../constants/actionTypes.js'

const { StateUtils: NavigationStateUtils} = NavigationExperimental;

let initialState = {
  index: 0, // starts with first route focused.
  routes: [{key: 'home'}], // starts with only one route.
}

export default (state: Object = initialState, action: allActions) : Object => {
  if (action.type === NAVIGATE_TO) {
    state = NavigationStateUtils.push(state, action.payload);
  } else if (action.type === NAVIGATE_BACK) {
    state = NavigationStateUtils.pop(state);
  }
  return state
}
