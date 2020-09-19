import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { logoutUser } from './reducers/actions';
import { AppBar, Avatar, Button, Toolbar, Grid, Typography, Box, Menu, MenuItem } from '@material-ui/core';

const Navbar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user, shallowEqual);
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<AppBar position="sticky">
			<Toolbar>
				<Box display="flex" component={NavLink} to="/" className="Navbar-Logo">
					<Avatar src="logo500.png" alt="Lyrify" />
					<Typography variant="body1"> yrify</Typography>
				</Box>
				{user.id ? (
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
							<Button
								variant="text"
								size="large"
								className="Navbar-Btn"
								color="inherit"
								component={NavLink}
								to="/favorites"
							>
								Favorites
							</Button>
						</Grid>
						<Avatar
							aria-controls="logout-menu"
							aria-haspopup="true"
							onClick={handleClick}
							sizes="lg"
							src={user.img_url}
							alt={user.display_name}
						/>
						{/* <Button>Open Menu</Button> */}
						<Menu
							id="logout-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</React.Fragment>
				) : null}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
