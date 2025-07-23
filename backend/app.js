const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const express = require('express');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');
const { requestLogger, errorLogger } = require('./utils/logger');

require('dotenv').config();

app.use(cors(corsOptions));

const allowedOrigins = [
  'https://webaround.mooo.com',
  'http://webaround.mooo.com',
  'https://www.webaround.mooo.com',
  'http://www.webaround.mooo.com',
];

const corsOptions = {
  origin(origin, callback) {
    // Permitir solicitudes sin origin (como curl o Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

// Se conecta a la base de datos de mongodb en el puerto 27017 y la base de datos se llama aroundb
mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors(
  {
    origin: corsOptions,
    credentials: true,
  },
));

app.use(requestLogger); // logger de peticiones

app.use(express.static(path.join(__dirname, 'public')));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/login', login);
app.post('/signup', createUser);

app.use('/', auth, routesUsers); // Middleware de autenticación aplicado
app.use('/', auth, routesCards); // Middleware de autenticación aplicado

app.use(errorLogger); // logger de errores

app.use(errors()); // Manejo de errores de Celebrate

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no encontrado');
  error.statusCode = 404;
  next(error); // Propaga el error al middleware de manejo de errores
});

// Middleware genérico para manejo de errores
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Error interno del servidor' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
