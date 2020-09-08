import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const Lyrics = ({ songData }) => {
	const { artist, song, lyrics, album_url, album_name, img_url, message } = songData;
	return (
		<Paper elevation={3} className="Lyrics">
			{message ? (
				<div className="Lyrics-Message">
					<Typography>{message}</Typography>
				</div>
			) : (
				<section className="Lyrics-Content">
					<div className="Lyrics-Header">
						<div className="Lyrics-Header-Left">
							<Typography variant="h3">"{song}"</Typography>
							<Typography variant="h4">By: {artist}</Typography>
						</div>
						<div className="Lyrics-Header-Right">
							<Card className="Lyrics-Album">
								{/* Set max height to 140px? */}
								<CardMedia
									className="Lyrics-Album-Img"
									image={img_url}
									title={album_name}
									component="img"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{album_name}
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										<Button
											href={album_url}
											target="_blank"
											rel="noreferrer noopener"
											variant="outlined"
											color="secondary"
										>
											View on Spotify
										</Button>
									</Typography>
								</CardContent>
							</Card>
						</div>
					</div>
					<Divider />

					<Typography variant="body2">{lyrics}</Typography>
				</section>
			)}
		</Paper>
	);
};

export default Lyrics;
