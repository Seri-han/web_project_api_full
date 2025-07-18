// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'URL de avatar no válida',
    },
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'El email no es valido'
    },
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
