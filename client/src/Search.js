import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getSong } from './reducers/actions';
import SearchForm from './SearchForm';
import Lyrics from './Lyrics';
// import Button from '@material-ui/core/Button';

const Search = () => {
	const dispatch = useDispatch();
	const songData = useSelector((state) => state.song.data, shallowEqual);
	// const [ searching, setSearching ] = useState(true);
	// const searchAgain = () => setSearching(true);
	const doSearch = (data) => {
		dispatch(getSong(data));
		// setSearching(false);
	};
	return (
		<Box>
			<Typography variant="h1">Search Lyrics</Typography>
			<SearchForm doSearch={doSearch} />
			<br />
			{songData ? <Lyrics songData={songData} /> : null}
		</Box>
	);
};
/*
{!searching ? (
				<Button variant="contained" color="primary" onClick={searchAgain}>
					Search Again
				</Button>
			) : null}
			*/

export default Search;
