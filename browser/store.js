import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducers} from './reducers';
import thunkMiddleware from 'redux-thunk';

import {whoami} from './reducers/auth';

export const store = createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(
			thunkMiddleware
		)
	)
);
