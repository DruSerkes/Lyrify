import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { getNowPlaying } from './reducers/actions';
import Lyrics from './Lyrics';
import Paper from '@material-ui/core/Paper';

const Playing = () => {
	const dispatch = useDispatch();
	const songData = useSelector((state) => state.song.data);
	const [ fetching, setFetching ] = useState(false);

	const handleGetNowPlaying = () => {
		setFetching(true);
	};

	useEffect(
		() => {
			// if (songData === {} && !fetching) {
			// 	setFetching(true);
			// }
			if (fetching) {
				dispatch(getNowPlaying());
			}
			return () => {
				setFetching(false);
			};
		},
		[ dispatch, fetching ]
	);

	return (
		<Box padding={2} margin={2}>
			<Typography variant="h1">Now Playing</Typography>
			<Button onClick={handleGetNowPlaying}>Get Now Playing</Button>
			{songData === {} ? (
				<Paper>
					<Typography variant="h5">No lyrics found</Typography>
				</Paper>
			) : (
				<Lyrics artist={songData.artist} song={songData.song} lyrics={songData.lyrics} />
			)}
		</Box>
	);
};
