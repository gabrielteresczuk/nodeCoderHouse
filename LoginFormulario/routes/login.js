const express = require("express");
const { Router } = express;

const router = Router();

// si esta logeado pasa, sino al login
function auth(req, res, next) {
  if (req.session?.nombre) {
    return next();
  } else {
    res.redirect("/login");
  }
}

// envia el home, SI esta logeado
router.get("/",auth, (req, res) => {
  res.sendFile(process.cwd() + "/public/home.html");
});

// envia el nombre de usaurio logeado
router.get("/user", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.json({ nombre: nombre });
  } else {
    res.json({ error: "usuario no encontrado" });
  }
});

// formulario de login
router.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.redirect("/");
  } else {
    res.sendFile(process.cwd() + "/public/login.html");
  }
});

// crea la session
router.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/");
});

// elimina la session
router.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.json({ nombre: nombre, status: "destoyed" });
      } else {
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
