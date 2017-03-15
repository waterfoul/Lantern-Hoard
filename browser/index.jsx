import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from './store';
import {Root} from './components/Root';
import {Home} from './components/Home';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Root>
				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route path="/home" component={Home} />
			</Root>
		</Router>
	</Provider>,
	document.getElementById('root')
);
