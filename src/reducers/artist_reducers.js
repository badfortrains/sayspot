// @flow
import type { allActions, navigatePayload } from '../constants/actionTypes.js'
import { SPOT_ARTIST } from '../constants/actionTypes.js'


let initialState = {
}

export default (state: Object = initialState, action: allActions) : Object => {
  if (action.type === SPOT_ARTIST && action.status == 'success' && action.payload) {
    state = {
      ...state,
      [action.payload.artist.id] : action.payload
    }
  }
  return state;
}
