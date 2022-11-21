const express = require("express");
const controllerProductos = require("../controllers/controllerProductos.js");
const { Router } = express;
const router = Router();

router.get('/api/productos-test',controllerProductos.getProductosTest);
router.get('/productos',controllerProductos.getProductos);
router.post('/productos',controllerProductos.postProductos);

module.exports = router;