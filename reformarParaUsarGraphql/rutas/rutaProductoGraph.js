const controllerProductosGraph = require("../controllers/controllerProductosGraph.js");

const productoSchema = require("../schema/productos_schema.js");

productosRoot = {
  getProductosTest: controllerProductosGraph.getProductosTest,
  getProductos: controllerProductosGraph.getProductos,
  getProducto: controllerProductosGraph.getProducto,
  postProductos: controllerProductosGraph.postProductos,
  putProductos: controllerProductosGraph.putProductos,
  deleteProductos: controllerProductosGraph.deleteProductosPorId,
};

rutasProductosGraph = {
  schema: productoSchema,
  rootValue: productosRoot,
  graphiql: true,
};

module.exports = rutasProductosGraph;
