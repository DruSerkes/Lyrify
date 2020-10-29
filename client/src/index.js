import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

