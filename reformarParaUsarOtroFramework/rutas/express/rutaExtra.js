const express = require("express");
const { Router } = express;
const router = Router();
const compression = require('compression');
const controllerExtra = require('../../controllers/controllerExtra.js');

router.get("/info",compression(), controllerExtra.getInfo);

router.get("/api/randoms",controllerExtra.getRandom);

/* ------------ ERROR 404 ----------- */

router.get('/*',controllerExtra.error404);

module.exports = router;