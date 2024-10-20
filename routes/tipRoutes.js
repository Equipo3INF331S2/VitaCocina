const express = require('express');
const Tip = require('../models/Tip');
const User = require('../models/User');
const router = express.Router();

router.get('/tips', async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/tip/:tipId', async (req, res) => {
  try {
    const tipId = req.params.tipId;
    const tip = await Tip.findOne({ _id: tipId })
      .populate('author', 'name')

    if (!tip) {
      return res.status(404).json({ message: 'Consejo no encontrado' });
    }

    res.json(tip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;