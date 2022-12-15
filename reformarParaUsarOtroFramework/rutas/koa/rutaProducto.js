const Router = require('koa-router');
const router = new Router();
const controllerProductos = require("../../controllers/koa/controllerProductos.js");

router.get('/api/productos-test',controllerProductos.getProductosTest);
router.get('/productos/:id',controllerProductos.getProductosPorId);
router.get('/productos',controllerProductos.getProductos);
router.post('/productos',controllerProductos.postProductos);
router.put('/productos',controllerProductos.putProductos);
router.delete('/productos/:id',controllerProductos.deleteProductosPorId)

router.get('/producto/:id',controllerProductos.vistaProductoPorId);

module.exports = router;