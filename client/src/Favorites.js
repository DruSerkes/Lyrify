import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const Favorites = () => {
	// Select favorites
	const favorites = useSelector((state) => state.user.data.favorites);
	// render a list of "favorite" (dumb component) list items
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
