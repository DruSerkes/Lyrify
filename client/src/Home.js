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
	const user = useSelector((state) => state.user.data);
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
		<Box position="relative" padding={2} height="100%">
			<Typography variant="h1">Lyrify</Typography>
			<Typography variant="body1">get lyrics for the songs you love</Typography>

			{user ? (
				<Box marginTop={19}>
					<Typography variant="body1" color="secondary" className="Home-Login">
						Welcome back {user.display_name}
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
