// @flow

import type { allActions } from '../constants/actionTypes.js'
import { LOGIN_PASSWORD, LOGIN_DISCOVERY } from '../constants/actionTypes.js'

let loginState = {
  status: 'initial'
}

export default function login(state: Object = loginState, action: allActions) : Object {
  if (action.type === LOGIN_PASSWORD || action.type === LOGIN_DISCOVERY) {
    return {
      ...state,
      status: action.status
    }
  }
  return state
}
