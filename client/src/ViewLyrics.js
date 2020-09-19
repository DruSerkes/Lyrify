import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Lyrics from './Lyrics';

const ViewLyrics = ({ songData }) => {
	return (
		<Box padding={1} margin={1} className="ViewLyrics">
			<Box padding={1} margin={1} className="ViewLyrics-Header">
				<Typography variant="h1">Lyrify</Typography>
			</Box>
			<Box component="section" className="Lyrics">
				{!songData.id ? <Typography variant="h5">Loading &hellip;</Typography> : <Lyrics songData={songData} />}
			</Box>
		</Box>
	);
};

export default ViewLyrics;
