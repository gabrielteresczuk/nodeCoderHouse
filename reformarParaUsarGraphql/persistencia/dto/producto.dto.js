class ProductoDTO{
    constructor(producto){
        this.nombre = producto.nombre,
        this.precio = producto.precio,
        this.foto = producto.foto
    }
}

module.exports=ProductoDTO;