const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const ExpressError = require('./helpers/ExpressError');

const app = express();

// Parse JSON
app.use(express.json());

// Some security
app.use(helmet);

// Request logger
app.use(morgan('dev'));

/*

TODO 
1. ADD ROUTE LOGIC FOR AUTHENTICATING A USER 
2. ADD ROUTE LOGIC FOR SPOTIFY API
3. ADD TESTS WHENEVER YOU WRITE A NEW ROUTE/FUNCTION 

*/

/** 404 handler */

app.use((req, res, next) => {
	const err = new ExpressError('Not Found', 404);

	// pass the error to the next piece of middleware
	return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	console.error(err.stack);

	return res.json({
		status  : err.status,
		message : err.message
	});
});

module.exports = app;
