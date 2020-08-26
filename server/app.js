const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Parse JSON
app.use(express.json());

// Some security
app.use(helmet);

// Request logger
app.use(morgan('dev'));

module.exports = app;
