import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNewSong } from './reducers/actions';
import Lyrics from './Lyrics';

const ShowFavorite = () => {
	const dispatch = useDispatch;
	const { id } = useParams();
	const favorites = useSelector((state) => state.favorites);
	const song = useSelector((state) => state.song);
	useEffect(
		() => {
			if (song.id !== id) dispatch(getNewSong(id));
		},
		[ song ]
	);

	return <Lyrics songData={song} />;
};

export default ShowFavorite;
