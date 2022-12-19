import { Router,send } from "../deps.ts";
import {renderColor,guardarColor,listarColor,listarColorId,borrarColorId,getBorrarColorId,actualizarColor} from "../controlador/controladorColor.ts"

export const router = new Router()
.get('/',renderColor)
.post('/color', guardarColor)
.get('/color/:id', listarColorId)
.get('/color', listarColor)    
.delete('/color/:id', borrarColorId) 
.get('/delete/:id', getBorrarColorId) 
.put('/color',actualizarColor)  
// esta ruta es necesaria para dejar estatito el path de views
.get('/views/:path+', async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
      root: Deno.cwd(),
    });
  })