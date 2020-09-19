import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Playing from './Playing';
import Search from './Search';
import Favorites from './Favorites';
import ShowFavorite from './ShowFavorite';

const Routes = () => {
	const user = useSelector((state) => state.user, shallowEqual);

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
				{user.id ? <Search /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/playing">
				{user.id ? <Playing /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/favorites">
				{user.id ? <Favorites user={user} /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/favorites/:id">
				{user.id ? <ShowFavorite /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
