import React, { useEffect, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gotUser } from './reducers/actions';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Home = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.user);
	const search = useLocation().search;
	const parsed = useMemo(() => queryString.parse(search), [ search ]);
	console.log('user === ', user);

	useEffect(
		() => {
			if (parsed.id) {
				console.log('parsed == ', parsed);
				localStorage.setItem('id', parsed.id);
				dispatch(gotUser(parsed));
				history.push('/');
			}
		},
		[ dispatch, parsed, history ]
	);

	return (
		<Box position="relative" padding={2} height="100%" className="Home">
			<Typography variant="h1">Lyrify</Typography>
			<Typography variant="body1" color="secondary">
				<em>lyrics for the songs you love</em>
			</Typography>

			{user ? (
				<Box marginTop={19}>
					<Typography variant="h5" color="primary" className="Home-Welcome">
						Hello {user.display_name}
					</Typography>
					<Typography variant="body1" color="light" className="Home-Welcome">
						Click <b>"Now Playing"</b> to get what you're currently listening to,
					</Typography>
					<Typography variant="body1" color="light" className="Home-Welcome">
						or just <b>"Search"</b> for whatever you feel like.
					</Typography>
				</Box>
			) : (
				<Box marginTop={19}>
					<Button
						className="Home-Login"
						variant="contained"
						color="primary"
						href="http://localhost:5000/spotify/auth"
					>
						Login with Spotify
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default Home;
