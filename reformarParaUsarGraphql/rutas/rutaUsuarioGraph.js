const controllerUsuariosGraph = require("../controllers/controllerUsuariosGraph.js");

const usuarioSchema = require('../schema/usuarios_schema.js');

usuariosRoot = {
    getUsuarios:controllerUsuariosGraph.getUsuarios,
    getUsuario:controllerUsuariosGraph.getUsuario,
    postUsuarios:controllerUsuariosGraph.postUsuarios,
    putUsuarios:controllerUsuariosGraph.putUsuarios,
    deleteUsuarios:controllerUsuariosGraph.deleteUsuariosPorId,
}

rutasUsuariosGraph = 
    {
        schema: usuarioSchema,
        rootValue: usuariosRoot,
        graphiql: true,
    }

module.exports = rutasUsuariosGraph
