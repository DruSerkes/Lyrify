import React from 'react';
import { render } from '@testing-library/react';
import Routes from '../Routes';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

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
				<Routes />
			</MemoryRouter>
		</Provider>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<Routes />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
