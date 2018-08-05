import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from './store';

import Frame from './template/frame';

import Lights from './pages/lights';
import Music from './pages/music';
import Environments from './pages/environments';
import Sounds from './pages/sounds';
import Error from './pages/errors/404';

const Pages = () => (
	<Frame>
		<Switch>
			<Route exact path="/" component={Lights} />
			<Route path="/lights" component={Lights} />
			<Route path="/music" component={Music} />
			<Route path="/environment" component={Environments} />
			<Route path="/sounds" component={Sounds} />
			<Route path="*" component={Error} /> {/* Default */}
		</Switch>
	</Frame>
);

const Special = () => (
	<Switch>
		<Route path="*" component={Error} />
	</Switch>
);

const Routes = () => (
	<ConnectedRouter history={history}>
		<Switch>
			<Route path="./special" component={Special} />
			<Route path="*" component={Pages} /> {/* Default */}
		</Switch>
	</ConnectedRouter>
);

export default Routes;
