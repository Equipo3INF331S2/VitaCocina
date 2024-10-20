import mongoose from 'mongoose';

const culinaryTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    minlength: [5, 'El título debe tener al menos 5 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    minlength: [10, 'La descripción debe tener al menos 10 caracteres']
  },
  img: {
    type: String, 
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, 'El autor es obligatorio']
  }
});

export default mongoose.models.CulinaryTip || mongoose.model('CulinaryTip', culinaryTipSchema);
