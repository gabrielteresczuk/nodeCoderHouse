const express = require("express");
const controllerProductos = require("../../controllers/controllerProductos.js");
const { Router } = express;
const router = Router();

router.get('/api/productos-test',controllerProductos.getProductosTest);
router.get('/productos/:id',controllerProductos.getProductosPorId);
router.get('/productos',controllerProductos.getProductos);
router.post('/productos',controllerProductos.postProductos);
router.put('/productos',controllerProductos.putProductos);
router.delete('/productos',controllerProductos.deleteProductosPorId)

router.get('/producto/:id',controllerProductos.vistaProductoPorId);


module.exports = router;