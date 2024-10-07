const { Router } = require('express');

// Controller
const AppTokenController = require('../controllers/apptoken');
const appToken = new AppTokenController();

// Middlewares
const MiddleAppToken = require('../middlewares/back/apptoken');
const { validateAppToken } = require('../middlewares/validateToken');

const router = Router();

// Ruta localhost:PORT

// Base - Endpoints base de la aplicación
router.use('/b', [ validateAppToken ], require('./base'));

// Generar App Token
router.post('/apptoken/:access', MiddleAppToken.create, appToken.createAppToken);

module.exports = router;