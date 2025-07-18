/* eslint-disable arrow-parens */
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error al obtener usuarios' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Error al buscar usuario' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(400).send({ message: 'Datos inválidos', error: err.message }));
};

// PATCH /users/me - actualizar perfil
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Datos inválidos' });
      if (err.statusCode === 404) return res.status(404).send({ message: err.message });
      return res.status(500).send({ message: 'Error del servidor al actualizar perfil' });
    });
};

// PATCH /users/me/avatar - actualizar avatar
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'URL inválida para avatar' });
      if (err.statusCode === 404) return res.status(404).send({ message: err.message });
      return res.status(500).send({ message: 'Error del servidor al actualizar avatar' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
