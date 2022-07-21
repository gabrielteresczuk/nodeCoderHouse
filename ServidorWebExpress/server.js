const express = require('express');
const Contenedor = require ('./Contenedor');

const app = express();

const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log('servidor http escuchando en el puerto ' + server.address().port);
});
server.on('error', error => console.log('error en el servidor' + error));

app.get('/', (req,res)=>{
    res.send(
        `<h1 style="color:blue">Bienvenido al Servidor Express</h1>`
    );
});

app.get('/productos', (req,res)=>{

    let productos= new Contenedor;
    productos.getAll().then(arr => 
        res.send(
            arr
        )
    );
});


app.get('/productoRandom', (req,res)=>{

    let productos= new Contenedor;
    productos.getAll().then(arr => {

        let random = Math.floor(Math.random() * arr.length);

            res.send(
                arr[random]
            )
        }
    );

});
