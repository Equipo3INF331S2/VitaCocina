const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'El autor es obligatorio']
      },
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    dietaryPreferences: { type: String, default: '' },
    time: { type: String, required: true },
    difficulty: { type: String, required: true },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String, default: '' }
      }
    ]
  });

module.exports = mongoose.model('Recipe', recipeSchema);
