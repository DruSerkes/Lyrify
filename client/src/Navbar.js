import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar } from '@material-ui/core';

const Navbar = () => {
	const user = useSelector((state) => state.user.data, shallowEqual);
	return (
		<AppBar position="sticky">
			<Toolbar>
				<Avatar>L</Avatar>
				{user !== undefined ? (
					<div>
						<Button color="inherit" component={NavLink} to="/playing">
							Now Playing
						</Button>
						<Button color="inherit" component={NavLink} to="/search">
							Search
						</Button>
						<Avatar sizes="lg" src={user.img_url} alt={user.display_name} />
					</div>
				) : null}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
