const express = require('express');
const helmet = require('helmet');

const app = express();

// Parse JSON
app.use(express.json());

// Some security
app.use(helmet);

// const app = require('./app');

// app.listen(3000, () => {
// 	console.log('App listening on port 3000');
// });

module.exports = app;
