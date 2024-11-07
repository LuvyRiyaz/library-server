const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ISBN: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }, // Add the available field here
});

module.exports = mongoose.model('Book', bookSchema);
