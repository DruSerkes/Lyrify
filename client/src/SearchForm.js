import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SearchForm = ({ doSearch }) => {
	const { register, handleSubmit, errors } = useForm();
	const submit = (data) => {
		console.log('data == ', data);
		doSearch(data);
	};

	return (
		<form className="SearchForm" onSubmit={handleSubmit(submit)}>
			<TextField
				inputRef={register}
				name="song"
				id="song"
				label="Song Name"
				variant="filled"
				margin="normal"
				required
				autoFocus
			/>
			<TextField
				inputRef={register}
				name="artist"
				id="artist"
				label="Artist Name"
				variant="filled"
				type=""
				margin="normal"
				required
				autoFocus
			/>
			<Button color="primary" variant="contained">
				Search
			</Button>
		</form>
	);
};

export default SearchForm;
