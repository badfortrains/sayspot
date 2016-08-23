/* @flow */
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import React, { Component } from 'react'
import Route from './navigator'
import { loginCache } from '../actions/settings'
import configureStore  from '../configureStore'

import spotcontrol from 'spotcontrol'
import { AsyncStorage } from 'react-native'

const logger = store => next => action => {
  //console.group(action.type)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  //console.groupEnd(action.type)
  return result
}

let store = configureStore({
    route: {section: 'settings'}
  });

//store.dispatch(loginCache())
export default class Root extends Component {
  componentDidMount() {
    spotcontrol.hello().catch(() =>{
      AsyncStorage.multiGet(['login', 'password']).then(([login, password]) => {
        if(login[1] && password[1]) {
          spotcontrol.login(login[1], password[1]).then(arg => {
            console.log('login success', arg)
          })
        }
      });
    }).then(() => console.log('logged in'))
  }

  render() {
    return (
    	<Provider store={store}>
        <Route></Route>
    	</Provider>
    );
  }
}
