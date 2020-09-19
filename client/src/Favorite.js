import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFavorite } from './reducers/actions';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const Favorite = ({ artist, song, id, userId }) => {
	const dispatch = useDispatch();
	return (
		<ListItem id={id} divider className="Favorite-Item">
			<Link to={`/favorites/${id}`} className="Favorite">
				{artist}: "{song}"
			</Link>
			<Button onClick={() => dispatch(removeFavorite(userId, id))}>Remove Favorite</Button>
		</ListItem>
	);
};

export default Favorite;
