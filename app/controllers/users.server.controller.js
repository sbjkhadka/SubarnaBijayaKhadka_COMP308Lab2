const User = require('mongoose').model('User');
exports.createNewUser = (req, res, next) => {
    console.log("reqBody", req.body);
  const user = new User(req.body);
  user.save((error) => {
      if(error) {
          return next(error);
      } else {
          res.json(user);
      }
  });
};
