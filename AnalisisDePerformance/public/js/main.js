const socket = io.connect();

/* -------- envio formulario -------- */

const container = document.getElementById('container');

const logout = document.getElementById('logout');

// chat

const chat_id = document.getElementById('chat_id');
const chat_nombre = document.getElementById('chat_nombre');
const chat_apellido = document.getElementById('chat_apellido');
const chat_edad = document.getElementById('chat_edad');
const chat_alias = document.getElementById('chat_alias');
const chat_avatar = document.getElementById('chat_avatar');

const chat_compresion = document.getElementById('chat_compresion');
const chat_form = document.getElementById('chat_form');
const chat_text = document.getElementById('chat_text');
const chat_msg = document.getElementById('chat_msg');


/* --------- login / logout --------- */

/*cargarUsuario = async () =>{

    let resp = await fetch('http://localhost:8080/user');
    let datos = await resp.json();
    console.log(datos);
    username.innerHTML = `${datos.nombre}`;
}

cargarUsuario();*/


/*logout.addEventListener('click',()=>{
    //console.log('logout');

    fetch('http://localhost:8080/logout')
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        let html = `
        <section class="main username">
            <h2>Hasta Luego ${data.nombre} 🖐</h2>
        </section>
        `;
        container.innerHTML = html;
        setTimeout(() => {
            location.href = '/login'
        }, 2000)
    })
});*/

/* ----------- al ingresar ---------- */


cargarProductos = () =>{
    fetch('http://localhost:8080/api/productos-test')
    .then(res => res.json())
    .then(data => {
        let html = `
        <section class="main">
        <h2>Lista de Productos</h2>
        `;
        if(data){
            html+=`<table><thead><th>Nombre</th><th>Precio</th><th>Imagen</th></thead><tbody>`;

            html+=data.map(el => {
                return (`<tr>
                <td>${el.nombre}</td>
                <td>${el.precio}</td>
                <td><img src=${el.foto} alt="imagen" /></td>
                </tr>`)
            }).join('');

            html+=`</tbody><tfoot><tr><td colspan="3"># Productos: ${data.length}</td></tr></tfoot></table>`;
        }else{
            html +=`<p class="nohay">No hay productos cargados</p>`;
        }

        html+=`</section>`;

        listado.innerHTML = html;
    });
}
cargarProductos();



function denormalizar(normalizado){

    const user = new normalizr.schema.Entity('users');
    const mensaje = new normalizr.schema.Entity('mensaje',{
        author:user
    });
    const mensajes = new normalizr.schema.Entity('mensajes',{
        mensajes:[mensaje]
    });
    const denormalizeData = normalizr.denormalize(normalizado.result, mensajes, normalizado.entities);
    return denormalizeData;
}


socket.on('chats',chats=>{

    chatDenormalizado = denormalizar(chats);

    let templateChats;

    if(chatDenormalizado){
        templateChats = chatDenormalizado.mensajes.map(el=>{
            return `
                <li>
                <div class='chat_datos'>
                <img src=${el.author.avatar} alt="avatar" />
                <strong>${el.author.id}</strong>
                <p>${el.date}</p>
                </div>
                <em>${el.text}</em>
                </li>
                `
            }).join('');
    }else{
        templateChats = `<li>- No hay chats, se el primero!</li>`
    }

    let valorNarmal = JSON.stringify(chats).length;
    let valorDenormal = JSON.stringify(chatDenormalizado).length;

    //console.log(chats);
    //console.log(`Valor NORMALIZADO:${valorNarmal}`);
    //console.log(chatDenormalizado);
    //console.log(`Valor DENORMALIZADO:${valorDenormal}`)

    if(chatDenormalizado.mensajes.length){
    chat_compresion.innerHTML = `Compresion al ${((100*valorNarmal)/valorDenormal).toFixed(2)} %`;
    }

    chat_msg.innerHTML=templateChats;
})

/* ------------- cargas ------------- */

//envio de chat
chat_form.addEventListener('submit',(event)=>{
    event.preventDefault();

    let chat = {
       author: {
            id:chat_id.value,
            nombre:chat_nombre.value,
            apellido:chat_apellido.value,
            edad:chat_edad.value,
            alias:chat_alias.value,
            avatar:chat_avatar.value
        },
        date:new Date().toLocaleString(),
        text:chat_text.value
    }

    socket.emit('nuevoChat',chat);
    chat_text.value='';
    chat_text.focus();
})
