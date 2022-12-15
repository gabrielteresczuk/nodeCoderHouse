const Router = require('koa-router');
const router = new Router();
const controllerExtra = require('../../controllers/koa/controllerExtra.js');

router.get("/info", controllerExtra.getInfo);

router.get("/api/randoms",controllerExtra.getRandom);

/* ------------ ERROR 404 ----------- */

router.get('/:error',controllerExtra.error404);

module.exports = router;