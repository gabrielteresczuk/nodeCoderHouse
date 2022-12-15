const logger = require('../../utils/logger/logger.js'); // -> logger

module.exports = {

    async base(req,res){
        res.render('login');
    },

    async getHome(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        if(req.user){
          let {username} = req.user;
          res.render('home',{username:username});
        }else{
          res.redirect('/login');
        }
    },

    async getLogin(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        if(req.isAuthenticated()){
          logger.log('info', `User logeado`);
            res.redirect('/home');
        }else{
          logger.log('info', `User NO logeado`);
            res.render('login');
        }
    },

    async postLogin(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        res.redirect('/home');
    },

    async getFailLogin(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        res.render('login-error',{});
    },

    async getSignup(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        res.render('signup');
    },

    async postSignup(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        res.redirect('/home');
    },

    async getFailSignup(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        res.render('signup-error',{}); 
    },

    async getLogout(req,res){
        logger.log('info', `ROUTE: ${req.path} - METHOD: ${req.method}`);
        if(req.user){
        let {username} = req.user;
          req.logout(()=>{
            res.render('logout',{username:username});
          });
        }else{
          res.redirect('/login');
        }
    }

}