/* @flow */
import * as types from '../constants/actionTypes'
import type { allActions } from '../constants/actionTypes'
import type { navigatePayload } from '../constants/actionTypes'

export const navigateTo = (route: {key: string}) : allActions => {
  console.log("navigate to")
  return {
    type: types.NAVIGATE_TO,
    payload: route
  }
}

export const navigateBack = () : allActions => {
  console.log("navigate back")
  return {
    type: types.NAVIGATE_BACK
  }
}
