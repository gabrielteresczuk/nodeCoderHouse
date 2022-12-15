const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js");

class UsuariosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("DB/usuarios.txt");
    console.log('Archivo Usuarios.txt: conectada');
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

module.exports = UsuariosDaoArchivo;