import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Home = () => {
	const search = useLocation().search;
	const parsed = queryString.parse(search);
	const [ user, setUser ] = useState(parsed);
	console.log(parsed);

	return (
		<div>
			<Typography variant="h1">Lyrify</Typography>

			{user ? (
				<Typography variant="body1" margin={2}>
					Welcome back {user.display_name}
				</Typography>
			) : (
				<a href="http://localhost:5000/spotify/auth">
					<Button variant="contained" color="primary">
						Login with Spotify
					</Button>
				</a>
			)}
		</div>
	);
};

export default Home;
