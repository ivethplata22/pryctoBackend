const { Router } = require('express');

const router = Router();

// Ruta localhost:PORT/b

router.post('/prueba', (req, res) => {
    res.send('Hola Mundo');
});

module.exports = router;