const { buildSchema } = require('graphql');

const usuarioSchema = buildSchema(`
type Usuario {
  id: ID!
  username: String,
  password: String,
}
type Delete{
    delete: Int
}
input UsuarioInput {
    username: String,
    password: String,
}
type Query {
  getUsuarios(username: String, password: String): [Usuario],
  getUsuario(id:String): Usuario,
}
type Mutation {
    postUsuarios(datos: UsuarioInput): Usuario
    putUsuarios(id:String,datos: UsuarioInput): Usuario
    deleteUsuarios(id:String): Delete
  }
`);

module.exports = usuarioSchema;