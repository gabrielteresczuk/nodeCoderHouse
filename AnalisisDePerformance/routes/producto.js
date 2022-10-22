const express = require("express");
const { Router } = express;
const router = Router();

const ApiProductosMock = require('../Api/ApiProductosMock.js');
const apiProducto = new ApiProductosMock();

router.get('/api/productos-test',async(req,res)=>{

    res.json(await apiProducto.popular(5));
});

module.exports = router;