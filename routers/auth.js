// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
'use strict';

const express = require('express');
const router = express.Router();

// Login validation
router.post('/login', function(req, res) {
  const { username, password } = req.body;
  const { auth } = require('../data.js');
  if (username === auth.username && password === auth.password) {
    return res.send({ code: 0, info: 'login successfully' });
  } else {
    return res.status(400).json({
      code: 1,
      info: 'username or password wrong'
    });
    // return res.status(403).send({
    //   success: false,
    //   message: 'No token provided.'
    // });
  }
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

module.exports = router;
