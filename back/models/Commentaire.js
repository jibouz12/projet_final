const mongoose = require('mongoose');

const commentaireSchema = mongoose.Schema({
  pseudo: { type: String, required: true },
  comment: { type: String, required: true },
  userId: { type: String, required: true },
  postId: { type: String, required: true },
});


module.exports = mongoose.model('Commentaire', commentaireSchema);