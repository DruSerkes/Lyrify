import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getUser } from './reducers/actions';
import Home from './Home';
import Playing from './Playing';

// TODO import components for search & include in Route
const Routes = () => {
	const user = useSelector((state) => state.user.data);
	// const dispatch = useDispatch();

	// useEffect(
	// 	() => {
	// 		if (!user && localStorage.getItem('id')) {
	// 			const id = localStorage.getItem('id');
	// 			dispatch(getUser(id));
	// 		}
	// 	},
	// 	[ dispatch, user ]
	// );

	return (
		<Switch>
			<Route exact path="/search">
				{user ? <h1>Search</h1> : <Redirect to="/" />}
			</Route>
			<Route exact path="/playing">
				{user ? <Playing /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
