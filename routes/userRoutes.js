const express = require('express');
const User = require('../models/User'); 
const Recipe = require('../models/Recipe.js');
const Tip = require('../models/Tip.js');
const router = express.Router();

router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/users', async (req, res) => {
    const { email, password } = req.query;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).json({ message: 'Usuario encontrado', user });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/allUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Eliminar el usuario
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar las reseñas asociadas al usuario de cada receta
        await Recipe.updateMany(
        { reviews: { $elemMatch: { user: id } } },
        { $pull: { reviews: { user: id } } }
        );

        // Eliminar todos los consejos del usuario
        await Tip.deleteMany({ author: id });

        // Eliminar recetas del usuario
        await Recipe.deleteMany({ author: id });

        res.status(200).json({ message: 'Usuario y sus recetas, consejos y reseñas eliminados exitosamente', deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    });

module.exports = router;