import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Home';

// TODO import components for search, playing, & include in their Routes
const Routes = () => {
	return (
		<Switch>
			<Route path="/search">
				<h1>Search</h1>
			</Route>
			<Route path="/playing">
				<h1>Playing</h1>
			</Route>
			<Route path="/">
				<Home />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
