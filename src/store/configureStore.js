import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';

import wrapperMiddleware from '../middleware/wrapper';
import * as reducers from '../reducers/';
import routes from '../routes';

let createStoreWithMiddleware;

const rootReducer = combineReducers({
  router: routerStateReducer,
  ...reducers
});

// Configure the dev tools when in DEV mode
if (__DEV__) {
  const {devTools, persistState} = require('redux-devtools');
  createStoreWithMiddleware = compose(
    reduxReactRouter({ routes, createHistory: createHistory }),
    applyMiddleware(wrapperMiddleware, thunkMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    reduxReactRouter({ routes, createHistory: createHistory }),
    applyMiddleware(wrapperMiddleware, thunkMiddleware)
  )(createStore);
}



export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}