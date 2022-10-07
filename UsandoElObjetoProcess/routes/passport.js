const passport = require("passport");                       //-> passport
const LocalStrategy = require("passport-local").Strategy;   //-> estrategia
const bCrypt = require("bcrypt");                           //-> encriptado

/* ---- persistencia de USUARIOS ---- */

const UsuariosDaoMongodb = require("../dao/UsuariosDaoMongodb.js");
const usuarios = new UsuariosDaoMongodb();

/* ---------- serializacion --------- */

passport.serializeUser(function (user, done) {
  console.log("serialize user");
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserialize user");
  done(null, user);
});

/* ------------ funciones ----------- */

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* ----------- middelware ----------- */

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("login");
      let user = await usuarios.buscar({ username: username });
      if (user) {
        if (isValidPassword(user, password)) {
          return done(null, user);
        } else {
          console.log("password incorrecto");
          return done(null, false);
        }
      } else {
        console.log("no existe el usuario");
        return done(null, false);
      }
    } catch (error) {
      console.log(error);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        let datos = await usuarios.buscar({ username: username });

        if (datos) {
          console.log("ya existe el usuario");
          return done(null, false);
        } else {
          let { username, password} = req.body;
          let user = await usuarios.guardar({
            username: username,
            password: createHash(password) // ENCRIPTAMOS EL PASSWORD
          });
          console.log("nuevo usuario:" + user);
          return done(null, req.body);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

module.exports = passport;