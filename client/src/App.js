import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './reducers/actions';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';

function App() {
	const user = useSelector((state) => state.user.data);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (user === {} && localStorage.getItem('id')) {
				const id = localStorage.getItem('id');
				dispatch(getUser(id));
			}
		},
		[ dispatch, user ]
	);

	return (
		<div className="App">
			<Navbar />
			<Routes />
		</div>
	);
}

export default App;
