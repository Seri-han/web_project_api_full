const router = require('express').Router();
const User = require('../models/user'); // Asegúrate que este archivo existe
const { updateProfile, updateAvatar } = require('../controllers/users');

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

router.get('/', (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error del servidor al obtener usuarios' }));
});

router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'ID de usuario no encontrado' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Error del servidor al buscar usuario' }));
});

router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error('Error creando usuario:', err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos de usuario no válidos', details: err.message });
      }
      return res.status(500).send({ message: 'Error del servidor al crear usuario' });
    });
});

module.exports = router;
