import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getFavorites } from './reducers/actions';
import Home from './Home';
import Playing from './Playing';
import Search from './Search';
import Favorites from './Favorites';
import ShowFavorite from './ShowFavorite';
import ViewLyrics from './ViewLyrics';

const Routes = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user, shallowEqual);
	const favorites = useSelector((state) => state.favorites, shallowEqual);
	const song = useSelector((state) => state.song, shallowEqual);

	useEffect(
		() => {
			if (user.id && !favorites.length) dispatch(getFavorites(user.id));
		},
		[ favorites, dispatch, user.id ]
	);

	return (
		<Switch>
			<Route exact path="/search">
				{user.id ? <Search songData={song} /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/playing">
				{user.id ? <Playing songData={song} /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/favorites">
				{user.id ? <Favorites user={user} favorites={favorites} /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/favorites/:id">
				{user.id ? <ShowFavorite songData={song} /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/lyrics">
				{user.id ? <ViewLyrics songData={song} /> : <Redirect to="/" />}
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
