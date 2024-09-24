const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  dietaryPreferences: String,
  time: Number,
  difficulty: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);
