/* eslint-disable arrow-parens */
const Card = require('../models/card');

// GET
const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Error del servidor al obtener tarjetas' }));
};

// POST
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Datos de tarjeta no válidos' });
      }
      return res
        .status(500)
        .send({ message: 'Error del servidor al crear tarjeta' });
    });
};

// DELETE

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .send({ message: 'No autorizado para eliminar esta tarjeta' });
      }
      return Card.findByIdAndDelete(req.params.cardId).then(() => res.send({ message: 'Tarjeta eliminada' }));
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta invalido' });
      }
      return res
        .status(500)
        .send({ message: 'error del servidor al eliminar tarjeta' });
    });
};

// PUT
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta invalido' });
      }
      return res
        .status(500)
        .send({ message: 'error del servidor al darle like' });
    });
};

// DELETE LIKE

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID de tarjeta invalido' });
      }
      return res
        .status(500)
        .send({ message: 'error del servidor al eliminar el like' });
    });
};

// EXPORTS
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
