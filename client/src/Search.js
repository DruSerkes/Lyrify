import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getSong } from './reducers/actions';
import SearchForm from './SearchForm';
import Lyrics from './Lyrics';

const Search = () => {
	const dispatch = useDispatch();
	const songData = useSelector((state) => state.song.data, shallowEqual);
	const doSearch = (data) => dispatch(getSong(data));

	return (
		<Box>
			<Typography variant="h1">Search Lyrics</Typography>
			<SearchForm doSearch={doSearch} />
			<br />
			{songData ? <Lyrics songData={songData} /> : null}
		</Box>
	);
};

export default Search;
