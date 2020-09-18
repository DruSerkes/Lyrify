import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Lyrics from './Lyrics';

const ShowFavorite = () => {
	const { id } = useParams();
	const favorites = useSelector((state) => state.favorites);
	const songData = favorites.find((fav) => fav.id === id);

	return <Lyrics songData={songData} />;
};

export default ShowFavorite;
