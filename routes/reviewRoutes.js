const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const router = express.Router();

router.post('/recipe/:recipeId/reviews', async (req, res) => {
    const { recipeId } = req.params;
    const { userId, rating, comment } = req.body;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
        return res.status(404).json({ message: 'Receta no encontrada' });
        }

        // Comprobar si el usuario ya ha hecho una reseña en esta receta
        const existingReview = recipe.reviews.find(review => review.user.toString() === userId);
        if (existingReview) {
        return res.status(400).json({ message: 'El usuario ya ha reseñado esta receta' });
        }

        const newReview = {
            user: userId,
            rating,
            comment
        };

        recipe.reviews.push(newReview);
        const savedRecipe = await recipe.save();

        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/recipe/:recipeId/reviews', async (req, res) => {
    const { recipeId } = req.params;
    const { userId, rating, comment } = req.body;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        const existingReview = recipe.reviews.find(review => review.user.toString() === userId);
        if (!existingReview) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }

        existingReview.rating = rating;
        existingReview.comment = comment;

        const savedRecipe = await recipe.save();

        res.status(200).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;