import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from './store';
import {Root} from './components/Root';
import {Login} from './components/Login';
import {Game} from './components/Game';
import {Lobby} from './components/Lobby';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Root>
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<Route path="/login" component={Login} />
				<Route path="/lobby" component={Lobby} />
				<Route path="/game" component={Game} />
			</Root>
		</Router>
	</Provider>,
	document.getElementById('root')
);
