const ContenedorMemoria = require("../../contenedores/ContenedorMemoria.js");

class UsuariosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super();
    console.log('Memoria Usuarios: conectada');
  }

  buscar = async (obj)=>{
    try {
        //let datos = await this.modelo.findOne({username:obj.username});
        let datos = await this.listarTodo();
        let usuario = datos.find(usuario => usuario.username === obj.username);
        if(usuario === undefined){
            return null;
        }else{
            return usuario;
        }
    } catch (error) {
        console.log('Buscar -ocurrio un error:' +error);
    }
  }

}

module.exports = UsuariosDaoMemoria;
