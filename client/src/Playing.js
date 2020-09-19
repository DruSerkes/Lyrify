import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { getNowPlaying } from './reducers/actions';
import Lyrics from './Lyrics';
import Paper from '@material-ui/core/Paper';

const Playing = () => {
	const dispatch = useDispatch();
	const songData = useSelector((state) => state.song, shallowEqual);
	const handleGetNowPlaying = () => {
		dispatch(getNowPlaying());
	};

	useEffect(
		() => {
			dispatch(getNowPlaying());
		},
		[ dispatch ]
	);

	return (
		<Box padding={1} margin={1} className="Playing">
			<Box padding={1} margin={1} className="Playing-Header">
				<Typography variant="h1">Now Playing</Typography>
				<Button variant="contained" color="primary" onClick={handleGetNowPlaying}>
					Get Current Song
				</Button>
			</Box>
			<Box component="section" className="Lyrics">
				{!songData.id ? (
					<Paper margin={3} padding={3}>
						<Typography variant="h5">Loading &hellip;</Typography>
					</Paper>
				) : (
					<Lyrics songData={songData} />
				)}
			</Box>
		</Box>
	);
};

export default Playing;
