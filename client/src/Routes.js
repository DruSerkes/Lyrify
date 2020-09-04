import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
				<h1>Home</h1>
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
