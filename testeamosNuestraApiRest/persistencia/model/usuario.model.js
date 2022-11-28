const mongoose = require("mongoose");
const usuariosCollection = "usuarios";

const UsuariosSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true }
});

const usuarios = mongoose.model(usuariosCollection, UsuariosSchema);

module.exports = usuarios;