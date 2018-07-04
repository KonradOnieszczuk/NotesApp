import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import nav from './reducers/nav';
import rest from './reducers/rest';

export default compose(
  applyMiddleware(thunk)
)(createStore)(combineReducers({ nav, rest }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
