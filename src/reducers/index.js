import { combineReducers } from 'redux';

// Reducers
import appReducer from './app-reducer';
// import secondReducer from './second-reducer';

var reducers = combineReducers({
  appState: appReducer,
  // secondState: secondReducer
});

export default reducers;