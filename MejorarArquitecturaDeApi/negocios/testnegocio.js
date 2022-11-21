const clase = require('./negocioProductos.js');

async function prueba(){
    console.log('probando...');
    let producto = {nombre:'coca',precio:'150',foto:'foto.jpg'};
    console.log('GUARDAR ' + await clase.guardarProducto(producto));
    console.log('GUARDAR 2 ' + await clase.guardarProducto(producto));
    console.log('ACTUALIZAR ' + await clase.actualizar({...(await clase.listarTodo())[1],nombre:'coca2'}) );
    console.log('LISTAR TODO ');
    console.log(await clase.listarTodo());
    console.log('LISTAR POR ID');
    console.log(await clase.listarPorId((await clase.listarTodo())[0]['_id']));
    console.log('BORRAR POR ID');
    console.log(await clase.borrarPorId((await clase.listarTodo())[0]['_id']));
    console.log('BORRAR TODO');
    console.log(await clase.borrarTodo());
}

prueba();