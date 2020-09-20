import React from 'react';
import { render } from '@testing-library/react';
import Search from '../Search';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'mutationobserver-shim';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const songData = {
	id     : 1,
	song   : 'test song',
	artist : 'the testers'
};

it('renders without crashing', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<Search songData={songData} />
			</MemoryRouter>
		</Provider>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Search songData={songData} />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
