/* @flow */
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import React, { Component } from 'react'
import Route from './navigator'
import reducer from '../reducers/index'

import { asyncMiddleware } from '../actions/shared.js'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

let store = createStore(reducer, {
    route: {section: 'settings'}
  },
  applyMiddleware(
    asyncMiddleware,
    //logger
  ))



export default class Root extends Component {
  render() {
    return (
    	<Provider store={store}>
        <Route></Route>
    	</Provider>
    );
  }
}
