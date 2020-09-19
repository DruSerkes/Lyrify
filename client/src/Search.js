import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getSong } from './reducers/actions';
import SearchForm from './SearchForm';
import Lyrics from './Lyrics';

const Search = ({ songData }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const doSearch = (data) => {
		dispatch(getSong(data));
		history.push(`/lyrics`);
	};

	return (
		<Box padding={1} margin={1}>
			<Box padding={1} margin={1} className="Search-Header">
				<Typography variant="h1">Search Lyrics</Typography>
				<SearchForm doSearch={doSearch} />
			</Box>
			<Box component="section" className="Lyrics">
				{songData ? <Lyrics songData={songData} /> : null}
			</Box>
		</Box>
	);
};

export default Search;
