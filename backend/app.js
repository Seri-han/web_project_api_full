const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const auth = require('./middleware/auth');
const { createUser, login } = require('./controllers/users');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const app = express();
const PORT = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Middlewares globales
app.use(cors); // ✅ poner primero
app.use(express.json()); // ✅ reemplaza a bodyParser
app.use(requestLogger); // ✅ antes de las rutas

// Rutas públicas
app.post('/signup', createUser);
app.post('/signin', login);

// Middleware de autorización
app.use(auth);

// Rutas protegidas
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

// Ruta 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

// Logs y manejo de errores
app.use(errorLogger);
app.use(errors()); // errores de Celebrate

// Middleware genérico de errores
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Error interno del servidor' : message,
  });
});

// Escucha del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
