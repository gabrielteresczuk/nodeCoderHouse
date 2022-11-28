//npm i mongoose
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const logger = require('../../utils/logger/logger.js'); // -> logger

let instance = null;

class ContenedorMongodb {


    constructor(url,modelo){
        this.url = url;
        this.modelo = modelo;
        //this.coneccion();
        this.getInstance();
    }

    getInstance = async()=>{
        if(instance){
            console.log('MongoDB: Ya estas conectado');
            return instance;
        }
        instance = mongoose.connect(this.url ,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDB: conectado');
        return instance;
    }

    /*coneccion = async ()=>{
        await mongoose.connect(this.url ,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('MongoDB: base de datos conectada');
    }*/

    guardar = async (obj) =>{
        try {
            let guardar = await new this.modelo(obj).save();
            return guardar._id.toString();
        } catch (error) {
            //console.log('Guardar - ocurrio un error: ' + error);
            logger.log('error', `Guardar - ${error}`);
        }finally{
        }
    }

    listarPorId = async (id) =>{
        try {
            if(!ObjectId.isValid(id)) return {error:'id invalido'}
            let datos = await this.modelo.findOne({_id:id});
            if (datos === null) return null;
            let newDatos = {...datos._doc,id:datos._id.toString()}
            return newDatos;

        } catch (error) {
            logger.log('error', `Listar por ID - ${error}`);
            return 'ListarPorId - No se pudo consultar:'+error;
        }finally{
        }
    }

    
    listarTodo = async () =>{
        try {
            let datos = await this.modelo.find({},{__v:0});
            let newDatos = datos.map(el=> {
                return {...el._doc,id:el._id.toString(),_id:el._id.toString()}
            });
            return newDatos;
        } catch (error) {
            return [];
        }finally{
        }
    }

    borrarPorId = async (id) =>{
        try {
            if(!ObjectId.isValid(id)) return {error:'id invalido'}
            let datos = await this.modelo.deleteOne({_id:id});
            return {delete:datos.deletedCount};
        } catch (error) {
            //console.log('Ocurrio un error al eliminar: '+error);
            logger.log('error', `BorrarPorId - ${error}`);
        }finally{
        }
    }

    borrarTodo = async () => {
        try {
            let datos = await this.modelo.deleteMany({});
            return datos;
        } catch (error) {
            //console.log('BorrarTodo - ocurrio un error:' + error);
            logger.log('error', `BorrarTodo - ${error}`);
        }finally{
        }
    }

    actualizar = async (obj)=>{
        try {
            if(!ObjectId.isValid(obj.id)) return {error:'id invalido'}

            let info = await this.modelo.updateOne({_id:obj.id},{$set:{...obj}});

            if (info.matchedCount === 0) return {error:'id invalido'};
            let datos = await this.listarPorId(obj.id);
            return datos;
        } catch (error) {
            logger.log('error', `Actualizar - ${error}`);
            return {error:'error en la peticion'}
        }
    }

}



module.exports = ContenedorMongodb