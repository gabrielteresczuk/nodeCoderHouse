const fs = require('fs');

class Carrito {

    constructor(archivo){
        this.archivo = archivo;
    }

    proximoID = (arr) =>{
        if(arr.length > 0){
            let ids = arr.map(producto =>  producto.id);
            const max = Math.max.apply(null, ids);
            return max+1;
        }else{
            return 1;
        }
    }

    guardar = async (obj) =>{
        try {
            let datos = await this.listarTodo();
            let proximoId = this.proximoID(datos);
            obj = {...obj,id:proximoId};
            let datosAGuardar = [...datos,obj];
            await fs.promises.writeFile(this.archivo,JSON.stringify(datosAGuardar, null, 2));
            return proximoId;
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }
    }

    guardarProducto = async (id,obj) =>{
        try {

            let carrito = await this.listarPorId(id);
            if(carrito){
                carrito.productos.push(obj);
                await this.actualizar(carrito);
                return carrito
            }else{
                return []
            }


        } catch (error) {
            console.log('GuardarProducto - ocurrio un error: ' + error);
        }
    }

    ListarProductosPorId = async (id) =>{

        try {
            let carrito = await this.listarPorId(id);
            if(carrito){
                return carrito.productos
            }else{
                return [];
            }
            
        } catch (error) {
            console.log('ListarProductosPorId - ocurrio un error: ' + error);
        }

    }

    listarPorId = async (id) =>{
        try {
            let datos = await fs.promises.readFile(this.archivo,'utf-8');
            datos = JSON.parse(datos);
            let producto = datos.find(producto => producto.id === id);
            if(producto === undefined){
                return null;
            }else{
                return producto;
            }
        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }
    }


    listarTodo = async () =>{
        try {
            let datos = await fs.promises.readFile(this.archivo,'utf-8');
            datos = JSON.parse(datos);
            return datos;
        } catch (error) {
            return [];
        }
    }

    borrarPorId = async (id) =>{
        try {
            let datos = await this.listarTodo();
            let nuevosDatos = datos.filter(producto => producto.id !== id);
            await fs.promises.writeFile(this.archivo,JSON.stringify(nuevosDatos, null, 2));

        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
        }
    }

    borrarProductoPorId = async (id,id_prod) =>{
        try {
            
            let carrito = await this.listarPorId(id);

            let productos = carrito.productos.filter(producto => producto.id !== id_prod);

            await this.actualizar({...carrito,productos:productos});

            return {delete:id_prod}
        } catch (error) {
            console.log('BorrarProductoPorId Ocurrio un error : '+error);
        }
    }

    borrarTodo = async () => {
        try {
            await fs.promises.writeFile(this.archivo,'[]');

        } catch (error) {
            console.log('deleteAll - ocurrio un error:' + error);
        }
    }

    actualizar = async (obj)=>{
        try {
            let datos = await this.listarTodo();

            let nuevosDatos = datos.map(el => el.id === obj.id? obj : el);

            await fs.promises.writeFile(this.archivo,JSON.stringify(nuevosDatos, null, 2));

        } catch (error) {
            console.log('actualizar - ocurrio un error:' + error);
        }

    }

}


module.exports = Carrito;