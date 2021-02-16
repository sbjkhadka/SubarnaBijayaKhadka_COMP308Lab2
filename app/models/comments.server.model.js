// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  courseCode: String,
  courseName: String,
  program: String,
  semester: String,
  comment: String,
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
mongoose.model('Comment', CommentSchema);
