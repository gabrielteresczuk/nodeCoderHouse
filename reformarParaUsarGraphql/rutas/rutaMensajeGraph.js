const controllerMensajesGraph = require("../controllers/controllerMensajesGraph.js");

const mensajeSchema = require('../schema/mensajes_schema.js');

mensajesRoot = {
    getMensajes:controllerMensajesGraph.getMensajes,
    getMensaje:controllerMensajesGraph.getMensaje,
    postMensajes:controllerMensajesGraph.postMensajes,
    putMensajes:controllerMensajesGraph.putMensajes,
    deleteMensajes:controllerMensajesGraph.deleteMensajesPorId,
}

rutasMensajesGraph = 
    {
        schema: mensajeSchema,
        rootValue: mensajesRoot,
        graphiql: true,
    }

module.exports = rutasMensajesGraph
