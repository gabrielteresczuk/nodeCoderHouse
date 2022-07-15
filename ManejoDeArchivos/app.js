const Contenedor = require ('./Contenedor');

//instanciamos el producto
productos= new Contenedor;

//cargamos un producto

productos.save({
    title:'lapiz',
    price:20,
    thumbnail:'lapiz.jpg'
}).then(id => console.log(id));

//obtenemos un producto por su id
productos.getById(3).then(obj => console.log(obj));

//mostramos todos los productos en la consola
productos.getAll().then(arr => console.log(arr));

//borramos un producto por su Id
productos.deleteById(2);

//borramos todos los productos
productos.deleteAll();