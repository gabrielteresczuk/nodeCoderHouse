
/* ------------- imports ------------ */

import {Application,viewEngine, ejsEngine, oakAdapter, config} from './deps.ts'
import {router} from "./routes/routes.ts";


/* ------------- config ------------- */

const port:string = config().PORT || '8080';

/* ------------- server ------------- */

const app = new Application();

/* ------------ midelware ----------- */

app.use(
  viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views",
  })
);


app.use(router.routes());

/* ------------ listener ------------ */

console.log('Sevidor DENO escuchando al puerto ' + port)
await app.listen({ port:8080 });

//deno run --allow-net --allow-read views.ts