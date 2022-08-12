
class DatosArray {

    constructor(){
        this.elementos = [];
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

    guardar = (obj) =>{
        try {
            let datos = this.listarTodo();
            let proximoId = this.proximoID(datos);
            obj = {...obj,id:proximoId};
            this.elementos.push(obj);
            return proximoId;
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }
    }

    listarPorId = (id) =>{
        try {
            let producto = this.elementos.find(el => el.id === id);
            if(producto === undefined){
                return null;
            }else{
                return producto;
            }
        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }
    }


    listarTodo = () =>{
        try {
            return [...this.elementos];
        } catch (error) {
            return [];
        }
    }

    borrarPorId = (id) =>{
        try {
            let nuevosDatos = this.elementos.filter(producto => producto.id !== id);
            this.elementos = [...nuevosDatos];
            return `id ${id} eliminado`
        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
        }
    }

    borrarTodo = () => {
        try {
            this.elementos = [];
            return 'todos los elementos eliminados';
        } catch (error) {
            console.log('deleteAll - ocurrio un error:' + error);
        }
    }

}


module.exports = DatosArray;