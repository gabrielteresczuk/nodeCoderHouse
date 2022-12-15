const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;

let producto = {nombre:'coca',precio:'150',foto:'coca.jpg'};
let productoParaActualizar = {nombre:'pepsi',precio:'200',foto:'pepsi.jpg'}


describe('test de productos',()=>{

    before(function(){
        console.log('\n ***** Comienzo TOTAL de test ***** \n');
    })

    after(function(){
        console.log('\n ***** fin TOTAL de test *****');
    })

    let idNuevo = null;

    describe('POST /producto',()=>{

        it('deberia incorporar un producto', async()=>{
            let response = await request.post('/productos').send(producto);
            expect(response.status).to.eql(200);
            idNuevo = response.body.id;
        });

        it('deberia comprobar los campos guardados', async()=>{
            let nuevoProducto = await request.get('/productos/'+idNuevo);
            expect(nuevoProducto.body.nombre).to.eql(producto.nombre);
            expect(parseInt(nuevoProducto.body.precio)).to.eql(parseInt(producto.precio));
            expect(nuevoProducto.body.foto).to.eql(producto.foto);
        });

        it('deberia retornar error "campos vacios"', async()=>{
            let response = await request.post('/productos').send({...producto,nombre:''});
            expect(response.status).to.eql(200);
            expect(response.body).deep.eql({ error: 'Campos vacios' });
        });

    })

    describe('PUT /producto',()=>{

        it('deberia actualizar un producto', async()=>{
            let response = await request.put('/productos').send({...productoParaActualizar, id:idNuevo});
            expect(response.status).to.eql(200);
        });

        it('deberia comprobar los campos actualizados', async()=>{
            let productoActualizado = await request.get('/productos/'+idNuevo);
            expect(productoActualizado.body.nombre).to.eql(productoParaActualizar.nombre);
            expect(parseInt(productoActualizado.body.precio)).to.eql(parseInt(productoParaActualizar.precio));
            expect(productoActualizado.body.foto).to.eql(productoParaActualizar.foto);
        });

        it('deberia retornar error "campos vacios"', async()=>{
            let response = await request.put('/productos').send({...productoParaActualizar,nombre:'', id:idNuevo});
            expect(response.status).to.eql(200);
            expect(response.body).deep.eql({ error: 'Campos vacios' });
        });

        it('deberia devolver un error "id invalido"', async()=>{
            let response = await request.put('/productos').send({...productoParaActualizar, id:'1122'});
            expect(response.status).to.eql(200);
            expect(response.body).deep.eql({ error: 'id invalido' });
        });

    })

    describe('GET /producto',()=>{
        it('deberia retornar los productos cargados', async()=>{
            let response = await request.get('/productos');
            expect(response.status).to.eql(200);
        });
    })


    describe('GET /producto/:id',()=>{
        it('deberia retornar el producto cargado anteriormete', async()=>{
            let response = await request.get('/productos/'+idNuevo);
            expect(response.status).to.eql(200);
        });

        it('deberia comprobar los campos YA actualizados', async()=>{
            let productoActualizado = await request.get('/productos/'+idNuevo);
            expect(productoActualizado.body.nombre).to.eql(productoParaActualizar.nombre);
            expect(parseInt(productoActualizado.body.precio)).to.eql(parseInt(productoParaActualizar.precio));
            expect(productoActualizado.body.foto).to.eql(productoParaActualizar.foto);
        });

        it('deberia devolver un objeto vacio', async()=>{
            let productoActualizado = await request.get('/productos/6380ba7b135aa0baaed00378');
            expect(productoActualizado.body).to.eql({});
        });

    })


    describe('DELETE /producto',()=>{

        it('deberia ELIMINAR el producto cargado anteriormete', async()=>{
            let response = await request.delete('/productos/'+idNuevo)//.send({id:idNuevo});
            expect(response.status).to.eql(200);
            expect(response.body).to.eql({delete:1});
        });

        it('deberia devolver un error "id invalido"', async()=>{
            let productoAEliminar =  await request.delete('/productos/1122')//.send({id:'1122'});
            expect(productoAEliminar.body).to.eql({error:'id invalido'});
        });


    })





})