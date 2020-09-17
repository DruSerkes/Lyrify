import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

const Favorite = ({ artist, song, id }) => {
	return (
		<Link to={`/favorites/${id}`} className="Favorite">
			<ListItem id={id} divider>
				{artist}: "{song}"
			</ListItem>
		</Link>
	);
};

export default Favorite;
