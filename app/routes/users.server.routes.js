var session = require("express-session");
const noback = require("./noback");
const helper = require("./helper");
// Load required controllers
const index = require("../controllers/index.server.controller");
const user = require("../controllers/users.server.controller");

// Define the routes module method
module.exports = (app) => {
    app.post('/comments', noback, user.createNewCommentByUser, user.commentsByStudent);
  app.get('/comments', noback, user.commentsByStudent);

    app.get("/display_users", user.getAllStudents);

    app.get("/display_comments", user.studentList);

    app.get(
      "/display_comments/:id/:firstName/:lastName",
      user.commentsFromUserId
    );
    app.get("/delete/:id", user.deleteStudentById);
};
