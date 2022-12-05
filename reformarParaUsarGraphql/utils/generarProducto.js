const { faker } = require ('@faker-js/faker/locale/es');

function generarProducto(){
    return {
        nombre:faker.commerce.product(),
        precio:faker.commerce.price(),
        foto:faker.image.image(100,100,true)
    }
}

module.exports = generarProducto