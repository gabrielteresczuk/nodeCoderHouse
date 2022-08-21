const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();

const Carrito = require("./api/Carrito.js");
const Producto = require("./api/Producto.js");
const Carritos = new Carrito("carritos.txt");
const Productos = new Producto("productos.txt");

/* -------- HABILITAMOS CORS -------- */
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
/* ----------- middelwares ---------- */

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(__dirname + '/public'))
//app.use(express.static(__dirname + '../client/build'));
app.use(express.static(path.resolve(__dirname, "./build")));

/* ---------- administrador --------- */

const ADMINISTRADOR = true;

/* ---------- api/productos --------- */

// GET trae 1 o todos los productos
app.get("/api/productos/:id?", (req, res) => {
  const { id } = req.params;

  if (id) {
    Productos.listarPorId(parseInt(id)).then((data) => {
      res.json(data);
    });
  } else {
    Productos.listarTodo().then((data) => {
      res.json(data);
    });
  }
});

// POST crea 1 producto
app.post("/api/productos", (req, res) => {

  if(ADMINISTRADOR){
    let timestamp = Date.now();

    Productos.guardar({ timestamp, ...req.body }).then((data) => {
      res.json({ id: data });
    });
  }else{
    res.json({ error : -1, descripcion: `ruta '${req.path}' método '${req.method}' no autorizada` });
  }

});

// PUT modifica 1 producto
app.put("/api/productos/:id", (req, res) => {

  if(ADMINISTRADOR){
    const { id } = req.params;
    let timestamp = Date.now();
  
    Productos.actualizar({ id: parseInt(id), timestamp, ...req.body }).then(
      (data) => {
        res.json({ id: data });
      }
    );
  }else{
    res.json({ error : -1, descripcion: `ruta '${req.path}' método '${req.method}' no autorizada` });
  }

});

// DELETE borra 1 producto
app.delete("/api/productos/:id", (req, res) => {

  if(ADMINISTRADOR){
    const { id } = req.params;

    Productos.borrarPorId(parseInt(id)).then((data) => {
      res.json({ delete: data });
    });
  }else{
    res.json({ error : -1, descripcion: `ruta '${req.path}' método '${req.method}' no autorizada` });
  }

});


/* ---------- /api/carrito ---------- */

// POST crea 1 carrito
app.post("/api/carrito", (req, res) => {
  let timestamp = Date.now();

  Carritos.guardar({ timestamp, productos: [] })
  .then((data) => {
    res.json({
      id: data,
    });
  });
});

// Delete borra 1 carrito completo
app.delete("/api/carrito/:id", (req, res) => {
  const { id } = req.params;

  Carritos.borrarPorId(parseInt(id))
  .then((data) => {
    res.json({ delete: id });
  });
});

// GET lista de productos de 1 carrito
app.get("/api/carrito/:id/productos", (req, res) => {
  const { id } = req.params;
  
  Carritos.ListarProductosPorId(parseInt(id))
  .then((data) => {
    res.json(data);
  });

});

// POST guardar 1 producto en 1 carrito
app.post("/api/carrito/:id/productos", (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.body;

  Productos.listarPorId(parseInt(id_prod))
  .then((productoData) => {
    Carritos.guardarProducto(parseInt(id), productoData)
    .then((data) => {
      res.json(data);
    });
  });
});

// DELETE borra 1 producto de 1 carrito
app.delete("/api/carrito/:id/productos/:id_prod", (req, res) => {
  const { id, id_prod } = req.params;

  Carritos.borrarProductoPorId(parseInt(id), parseInt(id_prod))
  .then((data) => {
    res.json(data);
  });
});


// cualquier ruta que no exista
app.use('/api/*', (req, res) => {

  res.json({
     error : -2, descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
  })
});

// sin este PATH, no podes actualizar las paginas
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});


/* ------------ listener ------------ */

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log("escuchando el puerto " + port);
});
server.on("error", (error) => {
  console.log("ocurrio un error " + error);
});
