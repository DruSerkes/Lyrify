import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Playing from './Playing';

// TODO import components for search & include in Route
const Routes = () => {
	return (
		<Switch>
			<Route path="/search">
				<h1>Search</h1>
			</Route>
			<Route path="/playing">
				<Playing />
			</Route>
			<Route path="/">
				<Home />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
