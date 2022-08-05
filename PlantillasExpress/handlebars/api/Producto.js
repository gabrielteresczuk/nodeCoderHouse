
class Producto {

    constructor(){
        this.datos=[];
    }
     

     findNextID = (arr) =>{
       
        if(arr.length > 0){

            let ids = arr.map(producto =>  producto.id);

            const max = Math.max.apply(null, ids);

            return max+1;
        }else{
            return 1;
        }

    }

    save = async (obj) =>{
        try {

            let proximoId = this.findNextID(this.datos);

            obj = {...obj,id:proximoId};

            let datosAGuardar = [...this.datos,obj];

            this.datos = datosAGuardar;

            return proximoId;
        } catch (error) {
            console.log('Save - ocurrio un error');
            console.log(error);
        }
    }

    getById = async (id) =>{

        try {

            let producto = this.datos.find(producto => producto.id === id);

            if(producto === undefined){
                return null;
            }else{
                return producto;
            }

        } catch (error) {
            return 'GetById - No se pudo consultar';
        }
    }


    getAll = async () =>{

        try {
                        
            if (this.datos.length === 0){
                return [];
            }else{

                return this.datos;
            }

        } catch (error) {
            console.log('getAll - No se pudo consultar');
        }

    }

    deleteById = async (id) =>{
        try {

            let nuevosDatos = this.datos.filter(producto => producto.id !== id);

            this.datos = nuevosDatos;

            console.log('Producto id:'+id+' a sido eliminado');

        } catch (error) {
            console.log('Ocurrio un error al eliminar');
        }
    }

    deleteAll = async () => {

        try {

            this.datos= [];

            console.log('Todos los datos han sido eliminados');

        } catch (error) {
            console.log('deleteAll - ocurrio un error');
        }
        
    }

    update = async (id,obj)=>{
        try {
            
            let nuevoDatos = this.datos.map(el => el.id === id ? {id,...obj}:el);

            this.datos = nuevoDatos;

        } catch (error) {
            console.log('Update - error al actualizar')
        }
    }


}


module.exports = Producto;