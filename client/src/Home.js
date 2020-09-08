import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { gotUser } from './reducers/actions';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Home = () => {
	const dispatch = useDispatch();
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
			}
		},
		[ dispatch, parsed ]
	);

	return (
		<div>
			<Typography variant="h1">Lyrify</Typography>

			{user ? (
				<Typography variant="body1" margin={2}>
					Welcome back {user.display_name}
					{/* TODO Add copy */}
				</Typography>
			) : (
				<a href="http://localhost:5000/spotify/auth">
					<Button variant="contained" color="primary">
						{/* TODO Add copy */}
						Login with Spotify
					</Button>
				</a>
			)}
		</div>
	);
};

export default Home;
