const express = require('express');
const Tip = require('../models/Tip');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const router = express.Router();

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

router.get('/tips', async (req, res) => {
  try {
    const tips = await Tip.find()
      .populate('author', 'name');
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Subir imagen de tip
router.post('/tipsImg', upload.single('img'), async (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo' });
  }
  const imgUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ url: imgUrl });
});

// Listar consejos para usuario específico
router.get('/tips/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const tips = await Tip.find({ author: userId })
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

// Actualizar consejo
router.put('/tip/:tipId', async (req, res) => {
  const { tipId } = req.params;
  try {
    const updatedTip = await Tip.findByIdAndUpdate(tipId, req.body, { new: true });

    if (!updatedTip) {
      return res.status(404).json({ message: 'Consejo no encontrado' });
    }

    res.status(200).json(updatedTip);
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