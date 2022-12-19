import { Context } from "../deps.ts";
import {guardar,listarTodo,listarPorId,borrarPorId,actualizar} from "../negocios/negociosColor.ts"

export const renderColor = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const colores = await listarTodo();
        await ctx.render("index.ejs", {data:colores} );
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}


export const guardarColor = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);

        const body = await ctx.request.body().value;
        const color = body.get('color')
        await guardar({id:'',color:color});
        ctx.response.redirect("/");
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

export const listarColor = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);

        const datos =  await listarTodo();

        ctx.response.body = datos;
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

export const listarColorId = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const id = ctx.params.id;
        const datos =  await listarPorId(id);

        ctx.response.body = datos;
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

export const borrarColorId = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const id = ctx.params.id;
        const datos =  await borrarPorId(id);

        ctx.response.body = datos;
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

export const getBorrarColorId = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const id = ctx.params.id;
        await borrarPorId(id);

        //ctx.response.body = datos;
        ctx.response.redirect("/");
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}

export const actualizarColor = async(ctx:Context)=>{
    try {
        console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
        const body = await ctx.request.body().value;
        const id = body.get('id')
        const color = body.get('color')
        const nuevoColor =  {id:id,color:color};
        const datos =  await actualizar(nuevoColor);

        ctx.response.body = datos;
    } catch (error) {
        console.log(error);
        ctx.response.body = {msg:error.message}
    }
}
