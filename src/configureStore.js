import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index'

import { asyncMiddleware } from './actions/shared.js'

const logger = store => next => action => {
  //console.group(action.type)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  //console.groupEnd(action.type)
  return result
}

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunk,
      asyncMiddleware,
      logger
    ),
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
