import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';

function App() {
	const user = useSelector((state) => state.user);

	return (
		<div className="App">
			<Navbar user={user} />
			<Routes />
		</div>
	);
}

export default App;
