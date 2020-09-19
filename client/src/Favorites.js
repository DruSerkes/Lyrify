import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Favorite from './Favorite';

const Favorites = ({ user, favorites }) => {
	return (
		<Box margin={1} padding={1}>
			<Box margin={2}>
				<Typography variant="h1">Favorites</Typography>
			</Box>
			<List className="Favorites">
				{favorites.length ? (
					favorites.map((fav) => (
						<Favorite artist={fav.artist} song={fav.song} id={fav.id} key={fav.id} userId={user.id} />
					))
				) : (
					<Typography>You haven't favorited any lyrics!</Typography>
				)}
			</List>
		</Box>
	);
};

export default Favorites;
