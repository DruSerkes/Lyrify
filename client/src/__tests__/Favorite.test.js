import React from 'react';
import { render } from '@testing-library/react';
import Favorite from '../Favorite';
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
				<Favorite />
			</MemoryRouter>
		</Provider>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Favorite />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});

