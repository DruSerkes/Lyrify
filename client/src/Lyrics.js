import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from './reducers/actions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Lyrics = ({ songData }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { id: songId } = songData;
	const favorites = user.favorites || {};
	const createMarkup = () => ({ __html: songData.lyrics });

	const toggleFavorite = () => {
		if (user.favorites[songId]) {
			dispatch(removeFavorite(user.id, songId));
		} else {
			dispatch(addFavorite(user.id, songId));
		}
	};

	return (
		<Paper elevation={5} className="Lyrics">
			{songData.message ? (
				<div className="Lyrics-Message">
					<Typography>{songData.message}</Typography>
				</div>
			) : (
				<section className="Lyrics-Content">
					<div className="Lyrics-Header">
						<div className="Lyrics-Header-Left">
							<Typography variant="h4">"{songData.song}"</Typography>
							<Typography variant="h5">By: {songData.artist}</Typography>
						</div>
						{songData.album_name && (
							<div className="Lyrics-Header-Right">
								<Box className="Lyrics-Album" raised>
									{/* Set max height to 140px? */}
									{songData.img_url && (
										<CardMedia
											className="Lyrics-Album-Img"
											image={songData.img_url}
											title={songData.album_name}
											component="img"
										/>
									)}
									<CardContent>
										{songData.album_name && (
											<Typography gutterBottom variant="h5" component="h2">
												{songData.album_name}
											</Typography>
										)}
										{songData.album_url && (
											<Button
												href={songData.album_url}
												target="_blank"
												rel="noreferrer noopener"
												variant="outlined"
												color="primary"
												size="small"
											>
												View on Spotify
											</Button>
										)}
										<Button variant="contained" color="secondary" onClick={toggleFavorite}>
											{favorites[songId] ? 'Remove favorite' : 'Save favorite'}
										</Button>
									</CardContent>
								</Box>
							</div>
						)}
					</div>
					<Divider variant="middle" />
					<Box margin={1} padding={2}>
						<Typography style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={createMarkup()} />
					</Box>
				</section>
			)}
		</Paper>
	);
};

export default Lyrics;
