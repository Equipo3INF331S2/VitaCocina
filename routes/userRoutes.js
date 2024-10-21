const express = require('express');
const User = require('../models/User'); 
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

module.exports = router;