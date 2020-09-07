import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Home';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
	render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it('should show login button to not-logged in user', () => {
	const { getByText } = render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
	const btn = getByText('Login with Spotify');
	expect(btn).toBeInTheDocument();
});
