const express = require("express");
const handlebars = require("express-handlebars");

// cargamos la clase producto
const Producto = require("./api/Producto.js");
const productos = new Producto();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//--------------------------------------------
//cargamos el engine

app.engine(
  "handlebars",
  handlebars.engine({
    extname: ".handlebars",
    defaultLayout: "index.handlebars",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

//--------------------------------------------
//creamos los verbos get y post

app.get("/productos", (req, res) => {
  productos.getAll().then((obj) => {
    res.render("view", {
      productos: obj,
      cantroductos: obj.length,
    });
  });
});

app.post("/productos", (req, res) => {
  const producto = req.body;
  productos.save(producto);
  res.redirect("/");
});

//--------------------------------------------
// puerto y listen

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Handlebars escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
