const axios = require('axios');

(async function clienteAxios(){
    try {

        let producto = {nombre:'coca',precio:'150',foto:'foto.jpg'};

        console.log('Corriendo pruebas ...');

        const postProducto = await axios.post('http://localhost:8080/productos',producto);
        console.log('[1/5]\n** metodo:POST - ruta:/productos **');
        console.log(postProducto.data);

        const putProducto = await axios.put('http://localhost:8080/productos',{...producto, nombre:'pepsi', id:postProducto.data.id});
        console.log('[2/5]\n** metodo:PUT - ruta:/productos **');
        console.log(putProducto.data);

        const getProductosPorId = await axios.get('http://localhost:8080/productos/'+postProducto.data.id);
        console.log('[3/5]\n** metodo:GET - ruta:api/productos/:id **');
        console.log(getProductosPorId.data);

        const getProductos = await axios.get('http://localhost:8080/productos');
        console.log('[4/5]\n** metodo:GET - ruta:/productos **');
        console.log(getProductos.data);

        const deleteProducto = await axios.delete('http://localhost:8080/productos',{data:{id:postProducto.data.id}});
        console.log('[5/5]\n** metodo:DELETE - ruta:/productos **');
        console.log(deleteProducto.data);



    } catch (error) {
        console.log('Error: ', err.message);
    }
})();