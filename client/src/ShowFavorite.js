import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getNewSong, removeSong } from './reducers/actions';
import ViewLyrics from './ViewLyrics';

const ShowFavorite = ({ songData }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	useEffect(
		() => {
			if (songData.id !== id) {
				dispatch(removeSong());
				dispatch(getNewSong(id));
				history.push('/lyrics');
			}
		},
		[ songData, dispatch, id, history ]
	);
	return <ViewLyrics songData={songData} />;
};

export default ShowFavorite;
