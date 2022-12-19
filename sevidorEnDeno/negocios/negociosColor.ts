import {ContenedorMemoria} from "../persistencia/ContenedorMemoria.js";
import {Color} from "../model/color.ts";
const colores = new ContenedorMemoria();


export const guardar = async(obj : Color)=>{
    const nuevoObj = await colores.guardar(obj);
    return nuevoObj;
}

export const listarTodo = async()=>{
    const datos = await colores.listarTodo();
    return datos;
}

export const listarPorId = async(id:string)=>{
   const datos = await colores.listarPorId(id);
   return datos;
}

export const borrarPorId = async(id:string)=>{
    const datos = await colores.borrarPorId(id);
    return datos;
 }

 export const actualizar = async(obj:Color)=>{
    const datos = await colores.actualizar(obj);
    return datos;
 }

