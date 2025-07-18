const express = require('express');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const app = express();
const PORT = 3000;


const { errors } = require('celebrate');

const cors = require('./middlewares/cors');

app.use((req, res, next) => {
  req.user = { _id: '682555d408a75a9b57f6c2d8' };
  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión:', err));

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});


app.use(cors);

app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);
app.use('/users', usersRouter);
app.post('/posts', postsRouter);

app.use(errorLogger);

app.use(errors()); // Manejo de errores de Celebrate

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no encontrado');
  error.statusCode = 404;
  next(error);
});

// Middleware genérico para manejo de errores
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Error interno del servidor' : message,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
