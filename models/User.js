import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    match: [/.+@.+\..+/, 'Por favor, ingresa un correo válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
