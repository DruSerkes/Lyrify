import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Lyrics = ({ songData }) => {
	const { artist, song, lyrics, message } = songData;
	return (
		<Paper elevation={3} className="Lyrics">
			{message ? (
				<div className="Lyrics-Message">
					<Typography>{message}</Typography>
				</div>
			) : (
				<div className="Lyrics-Content">
					<Typography variant="h3">"{song}"</Typography>
					<Typography variant="h4">By: {artist}</Typography>
					<Typography variant="body2">{lyrics}</Typography>
				</div>
			)}
		</Paper>
	);
};

export default Lyrics;
