import { Context} from "../deps.ts";

export const logger = async(ctx: Context, next:()=>void)=>{
    await next();
    console.log(`Method: ${ctx.request.method} Path: ${ctx.request.url.pathname}`);
}