import React from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Container component="main">
				<Routes />
			</Container>
		</div>
	);
}

export default App;
