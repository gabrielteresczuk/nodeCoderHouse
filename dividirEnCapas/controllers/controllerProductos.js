const negociosProductos = require('../negocios/negocioProductos.js');

module.exports ={

    async getProductosTest(req,res){
        let datos = await negociosProductos.obtenerProductos();
        res.json(datos);
    }

}