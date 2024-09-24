const express = require('express');
const Recipe = require('../models/Recipe');
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

// Agregar receta
router.post('/recipes', async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
