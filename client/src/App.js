import React from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';

function App() {
	// const user = useSelector((state) => state.user.data);
	// const dispatch = useDispatch();

	// useEffect(
	// 	() => {
	// 		if (user === {} && localStorage.getItem('id')) {
	// 			const id = localStorage.getItem('id');
	// 			dispatch(getUser(id));
	// 		}
	// 	},
	// 	[ dispatch, user ]
	// );

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
