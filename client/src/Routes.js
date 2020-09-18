import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { getFavorites } from './reducers/actions';
import Home from './Home';
import Playing from './Playing';
import Search from './Search';
import Favorites from './Favorites';
import ShowFavorite from './ShowFavorite';

const Routes = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user, shallowEqual);
	// const favorites = useSelector((state) => state.favorites);
	// console.log(favorites);
	// useEffect(
	// 	() => {
	// 		if (!favorites) dispatch(getFavorites(user.id));
	// 	},
	// 	[ favorites ]
	// );
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
