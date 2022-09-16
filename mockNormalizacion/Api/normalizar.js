const normalizr = require("normalizr");
const normalize = normalizr.normalize;
//const denormalize = normalizr.denormalize;
const schema = normalizr.schema;


function normalizar (original){

    const user = new schema.Entity('users');

    const mensaje = new schema.Entity('mensaje',{
        author:user
    });

    const mensajes = new schema.Entity('mensajes',{
        mensajes:[mensaje]
    });

    const normalizedData = normalize(original,mensajes);

    return normalizedData

}

module.exports = normalizar
