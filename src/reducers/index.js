// @flow
import { combineReducers } from 'redux'
import route from './route_reducers'
import settings from './settings_reducers'
import navigation from './navigation_reducers'

export default combineReducers({
  route,
  settings,
  navigation
})
