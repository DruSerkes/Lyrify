import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes />
		</div>
	);
}

export default App;
