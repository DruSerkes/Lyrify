import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFavorite } from './reducers/actions';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const Favorite = ({ artist, song, id, userId }) => {
	const dispatch = useDispatch();
	return (
		<ListItem id={id} divider className="Favorite">
			<Link to={`/favorites/${id}`} className="Favorite-Item">
				{artist}: "{song}"
			</Link>
			<Button
				variant="contained"
				size="small"
				color="secondary"
				onClick={() => dispatch(removeFavorite(userId, id))}
			>
				Remove
			</Button>
		</ListItem>
	);
};

export default Favorite;
