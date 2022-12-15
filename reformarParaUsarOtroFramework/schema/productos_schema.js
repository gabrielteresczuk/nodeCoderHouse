const { buildSchema } = require('graphql');

const productoSchema = buildSchema(`
type Producto {
  id: ID!
  nombre: String,
  precio: String,
  foto: String,
}
type Delete{
    delete: Int
}
input ProductoInput {
    nombre: String,
    precio: String,
    foto: String,
}
type Query {
  getProductosTest(nombre: String, precio: String, foto:String): [Producto],
  getProductos(nombre: String, precio: String, foto:String): [Producto],
  getProducto(id:String): Producto,
}
type Mutation {
    postProductos(datos: ProductoInput): Producto
    putProductos(id:String,datos: ProductoInput): Producto
    deleteProductos(id:String): Delete
  }
`);

module.exports = productoSchema;