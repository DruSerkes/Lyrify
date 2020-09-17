import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Favorite from './Favorite';

const Favorites = () => {
	const user = useSelector((state) => state.user);
	const favorites = Object.values(user.favorites);
	return (
		<React.Fragment>
			<Typography>Favorites</Typography>
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