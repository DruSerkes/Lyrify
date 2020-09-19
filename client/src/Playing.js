import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { getNowPlaying, removeSong } from './reducers/actions';
import Lyrics from './Lyrics';

const Playing = ({ songData }) => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(removeSong());
			dispatch(getNowPlaying());
		},
		[ dispatch ]
	);

	return (
		<Box padding={1} margin={1} className="Playing">
			<Box padding={1} margin={1} className="Playing-Header">
				<Typography variant="h1">Now Playing</Typography>
				<Button variant="contained" color="primary" onClick={() => dispatch(getNowPlaying())}>
					Get Current Song
				</Button>
			</Box>
			<Box component="section" className="Lyrics">
				{!songData.id ? <Typography variant="h5">Loading &hellip;</Typography> : <Lyrics songData={songData} />}
			</Box>
		</Box>
	);
};

export default Playing;
