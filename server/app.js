const express = require('express');
const helmet = require('helmet');

const app = express();

// Parse JSON
app.use(express.json());

// Some security
app.use(helmet);

module.exports = app;
