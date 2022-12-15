const MensajeDTO = require('../dto/mensaje.dto.js');
class MensajeRepository{
    constructor(dao){
        this.dao = dao;
    }

    guardar = async(obj) =>{
        let objDTO = new MensajeDTO(obj);
        let id = await this.dao.guardar(objDTO);
        return id;
    }

    listarPorId = async(id) =>{
        let datos = await this.dao.listarPorId(id);
        return datos;
    }

    listarTodo = async() => {
        let datos = await this.dao.listarTodo();
        return datos;
    }

    borrarPorId = async(id) =>{
        let info = await this.dao.borrarPorId(id);
        return info;
    }

    borrarTodo = async()=>{
        let info = await this.dao.borrarTodo();
        return info;
    }

    actualizar = async(obj)=>{
        let datos = await this.dao.actualizar(obj);
        return datos;
    }

}

module.exports = MensajeRepository;