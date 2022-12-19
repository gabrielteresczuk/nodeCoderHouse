//import * as uuid from "https://deno.land/std@0.119.0/uuid/mod.ts";

export class ContenedorMemoria {

    constructor(){
        this.elementos = [];
    }

    guardar = async (obj) =>{
        try {
            const myUUID = crypto.randomUUID();
            const nuevoObj = {...obj,id:myUUID};
            await this.elementos.push(nuevoObj);
            return nuevoObj;
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }
    }

    listarPorId = async (id) =>{
        try {
            const obj = await this.elementos.find(el => el.id === id);
            if(obj === undefined){
                return [];
            }else{
                return obj;
            }
        } catch (error) {
            console.log('error', `Listar por ID - ${error}`);
            return 'ListarPorId - No se pudo consultar:'+error;
        }
    }


    listarTodo = async () =>{
        try {
            return await [...this.elementos];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    borrarPorId = async (id) =>{
        try {
            const nuevosDatos = await this.elementos.filter(producto => producto.id !== id);
            this.elementos = [...nuevosDatos];
            return {delete:1}
        } catch (error) {
            console.log('error', `BorrarPorId - ${error}`);
        }
    }

    borrarTodo = async () => {
        try {
             this.elementos = await [];
            return 'todos los elementos eliminados';
        } catch (error) {
            console.log('error', `BorrarTodo - ${error}`);
        }
    }

    actualizar = async (obj)=>{
        try {
            const nuevoDatos = await this.elementos.map(el => el.id === obj.id ? obj:el);
            this.elementos = nuevoDatos;
            return nuevoDatos
        } catch (error) {
            console.log('error', `Actualizar - ${error}`);
        }
    }

}


