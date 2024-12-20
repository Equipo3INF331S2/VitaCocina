const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten archivos .jpeg, .jpg y .png'));
    }
});

// Listar recetas
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate('author', 'name');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Listar recetas para usuario específico
router.get('/recipes/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const recipes = await Recipe.find({ author: userId })
            .populate('author', 'name');
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
});

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

// Subir imagen de receta
router.post('/recipesImg', upload.single('img'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }
    const imgUrl = `${req.file.filename}`;
    res.status(200).json({ url: imgUrl });
});

// Actualizar receta
router.put('/recipe/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  try { 
      console.log('req.body', req.body);
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { $set: req.body }, { new: true });

      if (!updatedRecipe) {
          return res.status(404).json({ message: 'Receta no encontrada' });
      }

      res.status(200).json(updatedRecipe);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});
// Eliminar receta
router.delete('/recipe/:recipeId', async (req, res) => {
    try {
        const { recipeId } = req.params;

        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }

        res.status(200).json({ message: 'Receta eliminada exitosamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/searchrecipes', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const diet = req.query.diet;
        const time = req.query.time;
        const skill = req.query.skill;

        const query = {};

        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
            ];
        }
        if (diet) {
            query.dietaryPreferences = diet;
        }
        if (time) {
            query.time = time;
        }
        if (skill) {
            query.difficulty = skill;
        }

        console.log("Consulta MongoDB:", query);

        const recipes = await Recipe.find(query)
            .populate('author', 'name');

        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Agregar receta a favoritos
router.post('/favorites/:userId', async (req, res) => {
    const { recipeId } = req.body;

    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!user.favorites.includes(recipeId)) {
            user.favorites.push(recipeId);
            await user.save();
            return res.status(201).json({ message: 'Receta añadida a favoritos', user });
        } else {
            return res.status(400).json({ message: 'Receta ya está en favoritos' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar receta a favoritos' });
    }
});

// Obtener recetas favoritas de un usuario
router.get('/favorites/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId)
            .populate({
                path: 'favorites', // Popula las recetas favoritas
                populate: {
                    path: 'author', // Popula el campo "author" de cada receta
                    select: 'name'  // Solo traer el campo 'name' del autor
                }
            });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las recetas favoritas', error: err.message });
    }
});

// Eliminar receta favorita de un usuario
router.delete('/favorites/:userId/:recipeId', async (req, res) => {
    const { userId, recipeId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const recipeIndex = user.favorites.indexOf(recipeId);
        if (recipeIndex === -1) {
            return res.status(400).json({ message: 'La receta no está en favoritos' });
        }

        user.favorites.splice(recipeIndex, 1);
        await user.save();

        res.json({ message: 'Receta eliminada de favoritos' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la receta de favoritos', error: err.message });
    }
});

// Buscar si un usuario tiene una receta en favoritos o no
router.get('/favorites/check/:userId/:recipeId', async (req, res) => {
    const { userId, recipeId } = req.params;

    try {
        const userFavorites = await User.findById(userId).populate('favorites');

        if (!userFavorites) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la receta está en los favoritos
        const recipeInFavorites = userFavorites.favorites.some(favorite => favorite._id.toString() === recipeId);

        res.json({ inFavorites: recipeInFavorites });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error al verificar si la receta está en favoritos' });
    }
});

module.exports = router;