import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

/**
 * Form Schema
 */
const schema = yup.object().shape({
	song   : yup.string().required('Song name is required'),
	artist : yup.string().required('Artist name is required')
});

const SearchForm = ({ doSearch }) => {
	const { register, handleSubmit, errors } = useForm({
		mode     : 'onChange',
		resolver : yupResolver(schema)
	});
	const submit = (data) => {
		doSearch(data);
	};

	return (
		<form className="SearchForm" onSubmit={handleSubmit(submit)}>
			<FormControl>
				<TextField
					inputRef={register}
					error={errors.song}
					name="song"
					id="song"
					label="Song Name"
					variant="outlined"
					margin="normal"
					required
					autoFocus
				/>
				<TextField
					inputRef={register}
					error={errors.artist}
					name="artist"
					id="artist"
					label="Artist Name"
					variant="outlined"
					type=""
					margin="normal"
					required
					autoFocus
				/>
				<Button onClick={handleSubmit(submit)} color="primary" variant="contained">
					Search
				</Button>
			</FormControl>
		</form>
	);
};

export default SearchForm;
