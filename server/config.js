/** Shared config for application; can be req'd many places. */

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'test';
const PORT = +process.env.PORT || 5000;
const BCRYPT_WORK_FACTOR = +process.env.BCRYPT_WORK_FACTOR || 14;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectUri = process.env.redirectUri || 'http://localhost:5000/callback/';
const scopes = ['user-read-private', 'user-read-email', 'user-read-currently-playing'];
const HOME = process.env.HOMEPAGE_URL || 'http://localhost:3000/';
const state = process.env.state || 'some state of my choice';

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'lyrify-test'
// - else: 'lyrify'

const DB_URI = process.env.NODE_ENV === 'test' ? 'lyrify-test' : process.env.DATABASE_URL || 'lyrify'

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URI,
  BCRYPT_WORK_FACTOR,
  clientId,
  clientSecret,
  redirectUri,
  scopes,
  HOME,
  state
};
