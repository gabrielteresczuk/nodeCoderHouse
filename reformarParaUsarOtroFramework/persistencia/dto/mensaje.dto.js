class MensajeDTO{
    constructor(mensaje){
        this.author = {
            id : mensaje.author.id,
            nombre : mensaje.author.nombre,
            apellido : mensaje.author.apellido,
            edad : mensaje.author.edad,
            alias : mensaje.author.alias,
            avatar : mensaje.author.avatar
        },
        this.date = mensaje.date,
        this.text = mensaje.text
    }
}

module.exports=MensajeDTO;