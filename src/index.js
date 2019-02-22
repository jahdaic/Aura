import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import Routes from './router';

// import any global .js or .css here
import './css/style.css';
import 'flexboxgrid/css/flexboxgrid.css'

const app = document.getElementById('root');

ReactDOM.render(
	<Provider store={Store}>
		<Routes />
	</Provider>,
	app
);
