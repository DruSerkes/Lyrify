import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Grid, Typography, Box } from '@material-ui/core';

const Navbar = () => {
	const user = useSelector((state) => state.user.data, shallowEqual);
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Box display="flex" className="Navbar-Logo">
					<Avatar src="logo500.png" alt="Lyrify" />
					<Typography variant="body1"> yrify</Typography>
				</Box>
				{user !== undefined ? (
					<React.Fragment>
						<Grid container>
							<Button
								variant="text"
								size="large"
								className="Navbar-Btn"
								color="inherit"
								component={NavLink}
								to="/playing"
							>
								Now Playing
							</Button>
							<Button
								variant="text"
								size="large"
								className="Navbar-Btn"
								color="inherit"
								component={NavLink}
								to="/search"
							>
								Search
							</Button>
						</Grid>
						<Avatar sizes="lg" src={user.img_url} alt={user.display_name} />
					</React.Fragment>
				) : null}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
