import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Playing from './Playing';

// TODO import components for search & include in Route
const Routes = () => {
	return (
		<Switch>
			<Route exact path="/search">
				<h1>Search</h1>
			</Route>
			<Route exact path="/playing">
				<Playing />
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
