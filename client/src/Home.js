import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Home = () => {
	const { access_token } = useParams();
	const [ user, setUser ] = useState(null);
	const [ accessToken, setAccessToken ] = useState(access_token);
	console.log(accessToken);

	return (
		<div>
			<Typography variant="h1">Lyrify</Typography>

			{user ? (
				<Typography variane="body1">Welcome back {user.display_name}</Typography>
			) : (
				<a href="/spotify/auth">
					<Button variant="contained" color="primary">
						Login with Spotify
					</Button>
				</a>
			)}
		</div>
	);
};

export default Home;
