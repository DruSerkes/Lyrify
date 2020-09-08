import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Lyrics = ({ artist, song, lyrics }) => {
	return (
		<Paper elevation={3}>
			<Typography variant="h3">"{song}"</Typography>
			<Typography variant="h4">By: {artist}</Typography>
			<Typography variant="body2">{lyrics}</Typography>
		</Paper>
	);
};

export default Lyrics;
