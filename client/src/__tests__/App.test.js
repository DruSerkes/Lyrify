import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
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
				<App />
			</MemoryRouter>
		</Provider>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});

it('should show login button to not-logged in user', () => {
	const { getByText } = render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);
	const btn = getByText('Login with Spotify');
	expect(btn).toBeInTheDocument();
});
