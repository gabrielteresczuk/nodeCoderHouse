const logger = require('../../utils/logger/logger.js'); // -> logger

module.exports = {

    async base(ctx){
      logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
      await ctx.render('login.ejs');
    },

    async getHome(ctx){
      logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        //console.log(ctx.req.user);
        if(ctx.req.user){
          let {username} = ctx.req.user;
          await ctx.render('home',{username:username});
        }else{
          ctx.redirect('/login');
        }
    },

    async getLogin(ctx){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);

        if(ctx.isAuthenticated()){
          logger.log('info', `User logeado`);
            ctx.redirect('/home');
        }else{
          logger.log('info', `User NO logeado`);
          await ctx.render('login.ejs');
        }
    },

    async postLogin(ctx){
        logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        ctx.redirect('/home');
    },

    async getFailLogin(ctx){
      logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
      await ctx.render('login-error',{});
    },

    async getSignup(ctx){
      logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        await ctx.render('signup');
    },

    async postSignup(ctx){
      logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        ctx.redirect('/home');
    },

    async getFailSignup(ctx){
      logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        ctx.render('signup-error',{}); 
    },

    async getLogout(ctx){
      logger.log('info', `ROUTE: ${ctx.request.url} - METHOD: ${ctx.request.method}`);
        if(ctx.req.user){
        let {username} = ctx.req.user;
          await ctx.logout();
          await ctx.render('logout',{username:username});
        }else{
          ctx.redirect('/login');
        }
    }

}