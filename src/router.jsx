import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from './store';

import Frame from './template/frame';
import Title from './template/title';
import Navbar from './template/navbar';
import BackNavbar from './template/back-navbar';
import Playbar from './components/playbar/playbar';

import Lights from './pages/lights';
import Music from './pages/music';
import Environments from './pages/environments';
import Sounds from './pages/sounds';
// import App from './pages/app';
import Settings from './pages/settings';
import Error from './pages/errors/404';

const Pages = () => (
	<Frame>
		<header>
			<Title>Prestidigitation</Title>
			<Navbar />
		</header>
		<Switch>
			<Route exact path="/" component={Lights} />
			<Route path="/lights" component={Lights} />
			<Route path="/music" component={Music} />
			<Route path="/environments" component={Environments} />
			<Route path="/sounds" component={Sounds} />
			<Route path="*" component={Error} /> {/* Default */}
		</Switch>
		<Playbar />
	</Frame>
);

const Plain = () => (
	<Frame>
		<header>
			<Title>Prestidigitation</Title>
			<BackNavbar />
		</header>
		<Switch>
			<Route path="/settings" component={Settings} />
			<Route path="*" component={Error} /> {/* Default */}
		</Switch>
	</Frame>
);

const Routes = () => (
	<ConnectedRouter history={history}>
		<Switch>
			<Route path="/settings" component={Plain} />
			<Route path="*" component={Pages} /> {/* Default */}
		</Switch>
	</ConnectedRouter>
);

export default Routes;
