const express = require("express");
const { Router } = express;
const passport = require('./passport.js');

const router = Router();

/* -------------- HOME -------------- */

router.get("/", (req, res) => {
  res.render('login');
});

router.get('/home',(req,res)=>{
  console.log('get /home');
  if(req.user){
    let {username} = req.user;
    res.render('home',{username:username});
  }else{
    res.redirect('/login');
  }
});

/* -------------- LOGIN ------------- */

router.get('/login',(req,res)=>{
  console.log('get /login');
  if(req.isAuthenticated()){
      console.log('user logeado');
      res.redirect('/home');
  }else{
      console.log('usuario NO logeado');
      res.render('login');
  }
});

  router.post('/login',passport.authenticate('login',{failureRedirect:'/faillogin'}),(req,res)=>{
  console.log('post /login');
  res.redirect('/home');
});

router.get('/faillogin',(req,res)=>{
  console.log('get /faillogin');
  res.render('login-error',{});
});

/* ------------- SIGNUP ------------- */

router.get('/signup',(req,res)=>{
  console.log('get /signup')
  res.render('signup');
});

router.post('/signup',passport.authenticate('signup',{failureRedirect:'/failsignup'}),(req,res)=>{
    console.log('post /signup');
    res.redirect('/home');
});

router.get('/failsignup',(req,res)=>{
  console.log('get /failsignup');
  res.render('signup-error',{}); 
});

/* ------------- LOGOUT ------------- */

router.get('/logout',(req,res)=>{
  console.log('get /logout');
  if(req.user){
  let {username} = req.user;
    req.logout(()=>{
      res.render('logout',{username:username});
    });
  }else{
    res.redirect('/login');
  }

});

/* ------------ ERROR 404 ----------- */

router.get('*',(req,res)=>{
  res.status(404).render('routing-error',{});
});


module.exports = router;
