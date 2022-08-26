
class Maria {

    constructor(knex,tabla){
        this.knex = knex;
        this.tabla = tabla;
    }

    crearTabla = async () =>{

        try {

            let existe = await this.knex.schema.hasTable(this.tabla);
            if(existe){
                console.log(`'${this.tabla}' ya existe`)
            }else{
                await this.knex.schema.createTable(this.tabla,(table)=>{
                    table.increments('id')
                    table.string('nombre')
                    table.string('precio')
                    table.string('url')
                });
                console.log(`'${this.tabla}' creada`);
            }
            
        } catch (error) {
            console.log(error);
        }finally{
            //this.knex.destroy();
        }

    }

    guardar = async (obj) =>{
        console.log(obj);
        try {
            let guardar = await this.knex(this.tabla).insert(obj);
            return guardar;
        } catch (error) {
            console.log('Guardar - ocurrio un error: ' + error);
        }finally{
            //this.knex.destroy();
        }
    }

    listarPorId = async (id) =>{
        try {
            let datos = await this.knex(this.tabla).select('*').where({id:id});
            return datos[0];

        } catch (error) {
            return 'ListarPorId - No se pudo consultar:'+error;
        }finally{
            //this.knex.destroy();
        }
    }


    listarTodo = async () =>{
        try {
            let datos = await this.knex(this.tabla).select('*');
            return datos;
        } catch (error) {
            return [];
        }finally{
            //this.knex.destroy();
        }
    }

    borrarPorId = async (id) =>{
        try {
            await this.knex(this.tabla).where({id:id}).del()
        } catch (error) {
            console.log('Ocurrio un error al eliminar: '+error);
        }finally{
            //this.knex.destroy();
        }
    }

    borrarTodo = async () => {
        try {
            await this.knex(this.tabla).del();

        } catch (error) {
            console.log('BorrarTodo - ocurrio un error:' + error);
        }finally{
            //this.knex.destroy();
        }
    }

}


module.exports = Maria;