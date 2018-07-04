import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import nav from './reducers/nav';
import note from './reducers/note';

export default compose(
  applyMiddleware(thunk)
)(createStore)(combineReducers({ nav, note }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
