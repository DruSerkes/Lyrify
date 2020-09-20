import React from 'react';
import { render } from '@testing-library/react';
import Favorites from '../Favorites';
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
				<Favorites favorites={[ { id: 1, artist: 'test', song: 'testsong' } ]} user={{ id: 2 }} />
			</MemoryRouter>
		</Provider>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Favorites favorites={[ { id: 1, artist: 'test', song: 'testsong' } ]} user={{ id: 2 }} />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
