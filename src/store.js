import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reducers from './reducers';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [routerMiddleware(history)];

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
);

const store = createStore(connectRouter(history)(reducers), initialState, composedEnhancers);

export default store;
