const express = require("express");
const { Router } = express;
const router = Router();
const passport = require('../midelwares/passport.js');
const controllerLogin = require('../controllers/controllerLogin.js');
const logger = require('../utils/logger/logger.js'); // -> logger


router.get("/", controllerLogin.base);
router.get('/home',controllerLogin.getHome);
router.get('/login',controllerLogin.getLogin);
router.post('/login',passport.authenticate('login',{failureRedirect:'/faillogin'}),controllerLogin.postLogin);
router.get('/faillogin', controllerLogin.getFailLogin);

/* ------------- SIGNUP ------------- */

router.get('/signup',controllerLogin.getSignup);
router.post('/signup',passport.authenticate('signup',{failureRedirect:'/failsignup'}),controllerLogin.postSignup);
router.get('/failsignup',controllerLogin.getFailSignup);

/* ------------- LOGOUT ------------- */

router.get('/logout',controllerLogin.getLogout);

module.exports = router;
