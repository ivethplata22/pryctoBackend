const { Router } = require('express');

const router = Router();

// Ruta localhost:PORT

// Base - Endpoints base de la aplicación
router.use('/b', require('./base'));

module.exports = router;