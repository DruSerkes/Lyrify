import React from 'react';
import { useParams } from 'react-router-dom';
import Lyrics from './Lyrics';
// import Typography from '@material-ui/core/Typography';

const ShowFavorite = ({ favorites }) => {
	const { id } = useParams();
	const songData = favorites[id];

	return <Lyrics songData={songData} />;
};

export default ShowFavorite;
