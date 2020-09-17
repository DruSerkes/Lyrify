import React from 'react';
import { useParams } from 'react-router-dom';
import Lyrics from './Lyrics';
// import Typography from '@material-ui/core/Typography';

const ShowFavorite = ({ favorites }) => {
	const { id } = useParams();
	const song = favorites.id;

	return <Lyrics songData={song} />;
};

export default ShowFavorite;
