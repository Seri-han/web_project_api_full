const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const { NODE_ENV, JWT_SECRET = "dev-secret" } = process.env;

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.send(user);
  })
  .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "Credenciales inválidas" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res.status(401).send({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );

        res.send({ token });
      });
    })
    .catch(next);
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(500).send({ message: "Error al obtener usuarios" })
    );
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Error al buscar usuario" }));
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const { _id, name, about, avatar, email } = user;
      res.status(201).send({ _id, name, about, avatar, email });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Email duplicado
        res.status(409).send({ message: "El email ya está registrado" });
      } else {
        next(err);
      }
    });
};

// PATCH /users/me - actualizar perfil
const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).send({ message: "Datos inválidos" });
      if (err.statusCode === 404)
        return res.status(404).send({ message: err.message });
      return res
        .status(500)
        .send({ message: "Error del servidor al actualizar perfil" });
    });
};

// PATCH /users/me/avatar - actualizar avatar
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(400).send({ message: "URL inválida para avatar" });
      if (err.statusCode === 404)
        return res.status(404).send({ message: err.message });
      return res
        .status(500)
        .send({ message: "Error del servidor al actualizar avatar" });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
