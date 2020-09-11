import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getSong } from './reducers/actions';
import SearchForm from './SearchForm';
import Lyrics from './Lyrics';
import Button from '@material-ui/core/Button';

const Search = () => {
	const dispatch = useDispatch();
	const songData = useSelector((state) => state.song.data, shallowEqual);
	const [ searching, setSearching ] = useState(true);
	const searchAgain = () => setSearching(true);
	const doSearch = (data) => {
		dispatch(getSong(data));
		setSearching(false);
	};
	return (
		<Box>
			<Typography variant="h1">Search Lyrics</Typography>
			{searching ? <SearchForm doSearch={doSearch} /> : <Lyrics songData={songData} />}
			{!searching ? (
				<Button variant="contained" color="primary" onClick={searchAgain}>
					Search Again
				</Button>
			) : null}
			{/* TODO create searchForm, render it, add logic here and pass it down */}
			{/* on form submit, get the song data from spotify api, get lyrics, and render a Lyrics component with the songData passed down */}
			{/* Reserve some state "searching?" that when changed (button click at the top/bottom of page) renders form again instead of lyrics  */}
		</Box>
	);
};

export default Search;
