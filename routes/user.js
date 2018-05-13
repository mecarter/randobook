const express = require('express');
const router = express.Router();
const convert = require('xml-js');
const oauth = require('../services/oauth');
const gr = require('../services/goodreads');

router.get('/login', function(req, res, next) {
  if (req.session.goodreads) {
    res.redirect('/');
  } else {
    oauth.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
      if (error) {
        console.error(`Error getting OAuth request token : ${JSON.stringify(error)}`);
      } else {
        req.session.oauth = {
          oauthToken,
          oauthTokenSecret
        };
        const callbackURL = `${req.protocol}://${req.get('host')}/user/login/callback`;
        res.redirect(`http://www.goodreads.com/oauth/authorize?oauth_token=${oauthToken}&oauth_callback=${callbackURL}`);
      }
    })
  }
});

router.get('/login/callback', function(req, res, next) {
  if (req.session.goodreads) {
    res.redirect('/');
  } else {
    const { oauthToken, oauthTokenSecret } = req.session.oauth;
    const { authorize } = req.query;
    oauth.getOAuthAccessToken(oauthToken, oauthTokenSecret, authorize, (error, oauthAccessToken, oauthAccessTokenSecret) => {
      if (error) {
        console.error('error');
      } else {
        oauth.get('http://www.goodreads.com/api/auth_user', oauthAccessToken, oauthAccessTokenSecret, (error, data) => {
          if (error) {
            console.error(`Error getting User ID : ${utils.inspect(error)}`, 500);
          } else {
            const { user } = JSON.parse(convert.xml2json(data, { compact: true })).GoodreadsResponse;
            req.session.goodreads = {
              username: user.name._text,
              userid: user._attributes.id,
              success: 1,
              accessToken: oauthAccessToken,
              accessTokenSecret: oauthAccessTokenSecret,
            }
            res.redirect('/');
          }
        });
      }
    });
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(() => {
    res.redirect('/');
  })
});

module.exports = router;