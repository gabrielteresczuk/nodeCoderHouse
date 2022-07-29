//cargamos las librerias
const { Router } = require("express");
const Producto = require('./Producto');
const express = require('express');
const router = Router();
let producto = new Producto();


//instanciamos
const app = express();
const PORT = 8080;

//app use
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//carpeta publica donde se encuentra el HTML
app.use('', express.static(__dirname + '/public'));

// trae todos los registros
router.get('',(req,res)=>{
    producto.getAll().then(obj =>{
        res.json(obj)
    });
});

// trae el registo por 1 solo ID
router.get('/:id',(req,res)=>{
    let id = parseInt(req.params.id);

    producto.getById(id).then(obj =>{
        if(obj === null){
            res.json({error:'producto no encontrado'});
        }else{
            res.json(obj);
        }
        
    })
});

// guarda un registro al array
router.post('',(req,res)=>{
    let cuerpo = req.body;

    producto.save(cuerpo).then(id =>{
        res.json({id:id});
    });
});

// modifica el registro
router.put('/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    let cuerpo = req.body;

    producto.update(id,cuerpo).then(
        res.json({msg:'id modificado'})
    )
});

// elimina un registro por su ID
router.delete('/:id',(req,res)=>{
    let id = parseInt(req.params.id);

    producto.deleteById(id).then(
        res.json({msg:'id eliminado'})
    )
});

// ruta del servidor
app.use('/api/productos',router);

// metodo de escucha al puerto
app.listen(PORT,()=>{
    console.log('Escuchando al puerto ' + PORT);
})
