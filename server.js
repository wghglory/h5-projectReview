'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

//use sessions for tracking logins
app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  })
);

app.use('/api/', require('./routers/auth')); // authenticate
app.use('/api/projects', require('./routers/project')); // Project CRUD
app.use('/api/reviews', require('./routers/review')); // Project CRUD

app.listen(3000);
console.log('Server running on port 3000');
