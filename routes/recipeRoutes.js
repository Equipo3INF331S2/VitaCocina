const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const router = express.Router();

// Listar recetas
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/recipe/:recipeId', async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findOne({ _id: recipeId })
      .populate('author', 'name')
      .populate('reviews.user', 'name');

    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// Agregar receta
router.post('/recipes', async (req, res) => {  
  const recipe = new Recipe(req.body); 
  console.log('req.body', req.body);
  try {
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
