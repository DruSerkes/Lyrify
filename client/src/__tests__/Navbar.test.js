import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../Navbar';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

it('renders without crashing', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		</Provider>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Navbar />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
