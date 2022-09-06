const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageURL: { type: String, required: true },
  userId: { type: String, required: true },
  likes: { type: Number, required: true },
  date: { type: Date, required: true },
  com: { type: Array },
  usersLiked: { type: Array, required: true },
});


module.exports = mongoose.model('Post', postSchema);