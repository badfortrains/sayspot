// @flow

import type { allActions } from '../constants/actionTypes.js'
import { TOGGLE_SETTINGS } from '../constants/actionTypes.js'

let route = {
  section: 'settings'
}

export default function toggleDiscovery(state: Object = route, action: allActions) : Object {
  if (action.type === TOGGLE_SETTINGS) {
    return {
      ...state,
      section: state.section == 'settings' ? 'home' : 'settings'
    }
  }
  return state
}
