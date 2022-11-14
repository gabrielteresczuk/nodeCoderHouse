const passport = require("passport");                       //-> passport
const LocalStrategy = require("passport-local").Strategy;   //-> estrategia
const bCrypt = require("bcrypt");                           //-> encriptado
const logger = require('../utils/logger/logger.js');        // -> logger
const negocioUsuarios = require('../negocios/negocioUsuarios.js');

/* ---------- serializacion --------- */

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

/* ------------ funciones ----------- */

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

/* ----------- middelware ----------- */

passport.use(
  "login",
  new LocalStrategy(
    async (username, password, done) => {
    try {
      let user = await negocioUsuarios.buscarUsuario({username});
      if (user) {
        if (isValidPassword(user, password)) {
          return done(null, user);
        } else {
          // password incorrecto
          return done(null, false);
        }
      } else {
        // no existe el usuario
        return done(null, false);
      }
    } catch (error) {
      logger.log('info', `login ${error}`);
    }
  }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        let datos = await negocioUsuarios.buscarUsuario({username:username});
        if (datos) {
          // ya existe el usuario
          return done(null, false);
        } else {
          let { username, password} = req.body;
          await negocioUsuarios.guardarUsuario({username,password});
          // nuevo usuario creado
          return done(null, req.body);
        }
      } catch (error) {
        logger.log('info', `login ${error}`);
      }
    }
  )
);

module.exports = passport;