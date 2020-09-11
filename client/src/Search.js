import React from 'react';
import { Box, Typography } from '@material-ui/core';
import SearchForm from './SearchForm';

const Search = () => {
	return (
		<Box>
			<Typography variant="h1">Search Lyrics</Typography>
			{/* TODO create searchForm, render it, add logic here and pass it down */}
			{/* on form submit, get the song data from spotify api, get lyrics, and render a Lyrics component with the songData passed down */}
			{/* Reserve some state "searching?" that when changed (button click at the top/bottom of page) renders form again instead of lyrics  */}
		</Box>
	);
};

export default Search;
