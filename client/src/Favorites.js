import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorites } from './reducers/actions';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Favorite from './Favorite';

const Favorites = ({ user }) => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites);
	console.log('favorites in favorites', favorites);
	useEffect(
		() => {
			if (!favorites) dispatch(getFavorites(user.id));
		},
		[ favorites ]
	);
	return (
		<React.Fragment>
			<Typography variant="h1">Favorites</Typography>
			<List className="Favorites">
				{favorites.length ? (
					favorites.map((fav) => <Favorite artist={fav.artist} song={fav.song} id={fav.id} key={fav.id} />)
				) : (
					<Typography>You haven't favorited any lyrics!</Typography>
				)}
			</List>
		</React.Fragment>
	);
};

export default Favorites;
