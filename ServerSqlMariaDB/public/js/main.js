const socket = io.connect();

/* -------- envio formulario -------- */

// productos
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const url = document.getElementById('url');
const form = document.getElementById('form');
const listado = document.getElementById('listado');

// chat
const chat_email = document.getElementById('chat_email');
const chat_form = document.getElementById('chat_form');
const chat_text = document.getElementById('chat_text');
const chat_msg = document.getElementById('chat_msg');

/* ----------- al ingresar ---------- */

socket.on('productos', productos =>{
    console.log(productos);
    fetch('hbs/view.handlebars')
        .then(res => res.text())
        .then(vista => {
            const template = Handlebars.compile(vista);
            const html = template({ productos });
            listado.innerHTML = html;
        })
});

socket.on('chats',chats=>{

    let templateChats;

    if(chats.length){
        templateChats = chats.map(el=>{
            return `
                <li>
                <strong>${el.email}</strong>
                <p>${el.date}</p>
                <em>${el.text}</em>
                </li>
                `
            }).join('');
    }else{
        templateChats = `<li>- No hay chats, se el primero!</li>`
    }

    chat_msg.innerHTML=templateChats;
})

/* ------------- cargas ------------- */

// alta de producto
form.addEventListener('submit',(event)=>{
    event.preventDefault();

    let producto = {
        nombre: nombre.value,
        precio: precio.value,
        url: url.value
    }

    socket.emit('nuevoProducto',producto);
    form.reset();
});

//envio de chat
chat_form.addEventListener('submit',(event)=>{
    event.preventDefault();

    let chat = {
        email:chat_email.value,
        date:new Date().toLocaleString(),
        text:chat_text.value
    }

    socket.emit('nuevoChat',chat);
    chat_text.value='';
    chat_text.focus();
})
