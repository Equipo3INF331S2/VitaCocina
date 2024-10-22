const express = require('express');
const Tip = require('../models/Tip');
const User = require('../models/User');
const router = express.Router();

router.get('/tips', async (req, res) => {
  try {
    const tips = await Tip.find()
      .populate('author', 'name');
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

router.post('/tips', async (req, res) => {
  const tip = new Tip(req.body);
  try {
    const savedTip = await tip.save();
    res.status(201).json(savedTip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar consejo
router.delete('/tips/:tipId', async (req, res) => {
  try {
    const { tipId } = req.params;
    
    const deletedTip = await Tip.findByIdAndDelete(tipId);

    if (!deletedTip) {
      return res.status(404).json({ message: 'Consejo no encontrado' });
    }

    res.status(200).json({ message: 'Consejo eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;