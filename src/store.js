import { createStore, applyMiddleware } from 'redux'
import { setEndpointHost, setEndpointPath } from 'redux-json-api';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { API_ROOT } from './api'
import rootReducer from './rootReducer'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware),
);

store.dispatch(setEndpointHost(API_ROOT))
store.dispatch(setEndpointPath(""))

export default store;
