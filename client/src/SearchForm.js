import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

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
					name="song"
					error={errors.song ? true : false}
					id="song"
					label="Song Name"
					variant="outlined"
					margin="normal"
					required
					autoFocus
					helperText={errors.song ? errors.song.message : null}
				/>
				<TextField
					inputRef={register}
					name="artist"
					error={errors.artist ? true : false}
					id="artist"
					label="Artist Name"
					variant="outlined"
					type=""
					margin="normal"
					required
					helperText={errors.artist ? errors.artist.message : null}
				/>
				<Button type="submit" onClick={handleSubmit(submit)} color="primary" variant="contained">
					Search
				</Button>
			</FormControl>
		</form>
	);
};

export default SearchForm;
