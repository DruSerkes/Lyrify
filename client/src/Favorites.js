import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getFavorites } from './reducers/actions';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Favorite from './Favorite';

const Favorites = ({ user }) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites, shallowEqual);

	useEffect(
		() => {
			if (!favorites) dispatch(getFavorites(user.id));
		},
		[ favorites, dispatch, user.id ]
	);

	return (
		<React.Fragment>
			<Typography variant="h1">Favorites</Typography>
			<List className="Favorites">
				{favorites.length ? (
					favorites.map((fav) => (
						<Favorite artist={fav.artist} song={fav.song} id={fav.id} key={fav.id} userId={user.id} />
					))
				) : (
					<Typography>You haven't favorited any lyrics!</Typography>
				)}
			</List>
		</React.Fragment>
	);
};

export default Favorites;
