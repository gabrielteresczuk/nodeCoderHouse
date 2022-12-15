const { buildSchema } = require('graphql');

const mensajeSchema = buildSchema(`
type Author{
  id: String
  nombre: String,
  apellido: String,
  edad: Int,
  alias: String,
  avatar: String,
}
input AuthorInput{
  id: String
  nombre: String,
  apellido: String,
  edad: Int,
  alias: String,
  avatar: String,
}
type Mensaje {
  id: ID!
  author : Author,
  date: String,
  text: String,
}
type Delete{
    delete: Int
}
input MensajeInput {
  author : AuthorInput,
  date: String,
  text: String,
}
type Query {
  getMensajes(author: AuthorInput, date:String, text:String): [Mensaje],
  getMensaje(id:String): Mensaje,
}
type Mutation {
    postMensajes(datos: MensajeInput): Mensaje
    putMensajes(id:String,datos: MensajeInput): Mensaje
    deleteMensajes(id:String): Delete
  }
`);

module.exports = mensajeSchema;