var session = require('express-session');
const noback = require('./noback');
const helper = require('./helper');
// Load required controllers
const index = require('../controllers/index.server.controller');
const user = require('../controllers/users.server.controller');

// Define the routes module method
module.exports = (app) => {
  app.get('/', noback, (req, res) => {
    res.redirect('/login'); // User is redirected to new route to create a new session
  });
  app.get('/login', noback, index.render);

  // Note: No POST in login, index.ejs will redirect to /main
  app.post('/main', noback, index.login);

  app.get('/main', noback, (req, res) => {
    if (req.session && req.session.user) {
      res.render('main', { title: 'main', user: req.session.user });
    } else {
      res.redirect(`/login?showError=0`);
    }
  });

  app.get('/new_user', index.newUser);
  app
    .route('/user_registration')
    .get(index.renderRegistrationForm)
    .post(user.createNewUser);

  app.get('/logout', index.logout);

};
