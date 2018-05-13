const OAuth = require('oauth').OAuth;

const oauth = new OAuth(
  'https://goodreads.com/oauth/request_token',
  'https://goodreads.com/oauth/access_token',
  process.env.GOODREADS_KEY,
  process.env.GOODREADS_SECRET,
  '1.0a',
  null,
  'HMAC-SHA1',
);

module.exports = oauth;