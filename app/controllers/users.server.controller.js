const User = require('mongoose').model('User');
var Comment = require("mongoose").model("Comment");
var ObjectId = require("mongodb").ObjectID;

exports.createNewUser = (req, res, next) => {
    console.log("reqBody", req.body);
  const user = new User(req.body);
  user.save((error) => {
      if(error) {
          return next(error);
      } else {
          res.redirect('/');
      }
  });
};


exports.createNewCommentByUser = (req, res, next) => {
    const comment = new Comment(req.body);
    comment.user = req.session.user;
    comment.save((error) => {
        if(error) {
            return next(error);
        } 
        else {
          next();
        }
    });

};

exports.commentsByStudent = function (req, res, next) {
  if(req.session && req.session.user) {
      var email = req.session.user.email;
      //find the student then its comments using Promise mechanism of Mongoose
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return getErrorMessage(err);
        }
        //
        console.log("user", user);
        req.user = user;
        req.id = user._id;
        console.log(req.id);
      }).then(function () {
        //find the posts from this author
        Comment.find(
          {
            user: req.id,
          },
          (err, comments) => {
            if (err) {
              return getErrorMessage(err);
            }
            // res.json(comments);
            res.render('thankyou', {
              comments: comments,
              user: req.user
            })
          }
        );
      });

  } else {
    res.redirect(`/login?showError=0`);
  }
};

exports.commentsFromUserId = (req, res) => {
  // res.json(req.body);
  console.log('param', req.params.id);
   Comment.find(
     {
       user: req.params.id,
     },
     (err, comments) => {
       if (err) {
         return getErrorMessage(err);
       }

      //  res.json(comments);
       res.render("commentsNonLoggedIn", { 
         comments: comments,
        firstName: req.params.firstName,
        lastName: req.params.lastName  });
     }
   );
};


// this is not implemented as it is not asked in the assignment requirement
exports.getAllComments = (req, res) => {
  Comment.find({}, (error, comments) => {
    if(error) {
      return getErrorMessage(error);
    } else {
      res.json(comments);
    }
  });
};

exports.getAllStudents = (req, res) => {
  User.find({}, (error, users) => {
    if(error) {
      return getErrorMessage(error);
    } else {
      res.render('students', {students: users})
      // res.json(users);
    }
  });
};

exports.studentList = (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      return getErrorMessage(error);
    } else {
      res.render('readComments', { students: users });
    }
  });
};



exports.deleteStudentById = (req, res) => {
  User.deleteOne(
    { _id: ObjectId(req.params.id.toString()) },
    (error, result) => {
      if (error) {
        console.log(error);
        return getErrorMessage(error);
      } else {
        console.log("deleted...", result);
        res.redirect("/display_users");
      }
    }
  );
};