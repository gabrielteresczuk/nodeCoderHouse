const logger = require('../../utils/logger/logger.js'); // -> logger

class ContenedorMemoria {

    constructor(){
        this.elementos = [];
    }

    isValid = async (id)=> {
        let valid = this.elementos.find(el => el.id === parseInt(id));
        console.log(valid);
        if(valid !== undefined){

            return true
        }else{
            return false
        }
    }

    proximoID = (arr) =>{
        if(arr.length > 0){
            let ids = arr.map(el => el.id);
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
            this.elementos.push(obj);
            //return proximoId;
            return obj;
        } catch (error) {
            //console.log('Guardar - ocurrio un error: ' + error);
            logger.log('error', `Guardar - ${error}`);
        }
    }

    listarPorId = async (id) =>{
        try {
            let producto = this.elementos.find(el => el.id === parseInt(id));
            if(producto === undefined){
                return null;
            }else{
                return producto;
            }
        } catch (error) {
            logger.log('error', `Listar por ID - ${error}`);
            return 'ListarPorId - No se pudo consultar:'+error;
        }
    }


    listarTodo = async () =>{
        try {
            return [...this.elementos];
        } catch (error) {
            return [];
        }
    }

    borrarPorId = async (id) =>{
        try {
            if(!await this.isValid(id)) return {error:'id invalido'}
            let nuevosDatos = this.elementos.filter(producto => producto.id !== parseInt(id));
            this.elementos = [...nuevosDatos];
            return {delete:1}
        } catch (error) {
            //console.log('Ocurrio un error al eliminar: '+error);
            logger.log('error', `BorrarPorId - ${error}`);
        }
    }

    borrarTodo = async () => {
        try {
            this.elementos = [];
            return 'todos los elementos eliminados';
        } catch (error) {
            //console.log('deleteAll - ocurrio un error:' + error);
            logger.log('error', `BorrarTodo - ${error}`);
        }
    }

    actualizar = async (obj)=>{
        try {
            if(!await this.isValid(obj.id)) return {error:'id invalido'}
            let nuevoDatos = this.elementos.map(el => el.id === obj.id ? obj:el);
            if(nuevoDatos.length === 0) return {error:'id invalido'};
            this.elementos = nuevoDatos;
            return nuevoDatos
        } catch (error) {
            //console.log('Actualizar - error al actualizar');
            logger.log('error', `Actualizar - ${error}`);
        }
    }

}


module.exports = ContenedorMemoria;