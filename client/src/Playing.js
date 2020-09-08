import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { getNowPlaying } from './reducers/actions';
import Lyrics from './Lyrics';
import Paper from '@material-ui/core/Paper';

const Playing = () => {
	const dispatch = useDispatch();
	const songData = useSelector((state) => state.song.data, shallowEqual);
	console.log('songData === ', songData);
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
		<Box padding={1} margin={1}>
			<Box padding={1} margin={1}>
				<Typography variant="h1">Now Playing</Typography>
				<Button variant="contained" color="primary" onClick={handleGetNowPlaying}>
					Get Now Playing
				</Button>
			</Box>
			<section className="Lyrics">
				{!songData ? (
					<Paper margin={3} padding={3}>
						<Typography variant="h5">No lyrics found</Typography>
					</Paper>
				) : (
					<Lyrics songData={songData} />
				)}
			</section>
		</Box>
	);
};

export default Playing;
