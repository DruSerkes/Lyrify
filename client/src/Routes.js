import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { getUser } from './reducers/actions';
import Home from './Home';
import Playing from './Playing';
import Search from './Search';
import Favorites from './Favorites';
import ShowFavorite from './ShowFavorite';

const Routes = () => {
	const user = useSelector((state) => state.user);
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
				{user ? <Search /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/playing">
				{user ? <Playing /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/favorites">
				{user ? <Favorites /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/favorites/:id">
				{user ? <ShowFavorite favorites={user.favorites} /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
