const session = require('express-session');
// Load the 'User' Mongoose model
const User = require('mongoose').model('User');

const indexOfErrors = [
    'Please login', 
    'Incorrect email or password'
];

exports.render = (req, res) => {
    if(req.session && req.session.user) {
        res.redirect('/main');
        // res.render("main", { title: "main", user: req.session.user });
    } else {
        if(req.query.showError) {
             res.render("index", {
              errorMessage: indexOfErrors[Number(req.query.showError)]
             });
        } else {
             res.render("index", {
               errorMessage: null,
             });
        }
    } 
};

exports.newUser = (req, res) => {
    res.redirect('/user_registration');
};

exports.renderRegistrationForm = (req, res) => {
    res.render('registration_form', {});
};

exports.login = (req, res, next) => {
    console.log('request_object', req.body);
    var email = req.body.email;
    User.findOne({
        email: email
    }, (error, user) => {
        if(error) {
            return next(error);
        } else {
            if(user.email === req.body.email && user.password === req.body.password) {
              // res.redirect('/main');
              var session = req.session;

              // Set the 'req.user' property
              req.user = user;
              session.user = user;
              //parse it to a JSON object
              var jsonUser = JSON.parse(JSON.stringify(user));
              console.log('user', jsonUser);
              //display edit page and pass user properties to it
              res.render('main', { title: 'main', user: session.user });

              // Call the next middleware
              next();
            } else {
                res.redirect(`/login?showError=1`);
            }

        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};








