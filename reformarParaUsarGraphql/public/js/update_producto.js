const id_producto = document.getElementById('id_producto');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const foto = document.getElementById('foto');
const form = document.getElementById('form');


const id = id_producto.value;

/* ------ carga del los campos ------ */

   fetch('http://localhost:8080/productogql', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `{
        getProducto(id:"${id}") {
            id
            nombre
            precio
            foto
        }
       }`
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    if(data.data.getProducto){
        let producto = data.data.getProducto;
        nombre.value = producto.nombre;
        precio.value = producto.precio;
        foto.value = producto.foto;
    }else{
        form.innerHTML = `<p>Producto inexistente</p>`;
    }
  });
  
/* ------ envio del formulario ------ */

form.addEventListener('submit',function (e){
    e.preventDefault();

    fetch('http://localhost:8080/productogql', {
        method: 'POST',
      
        headers: {
          "Content-Type": "application/json"
        },
      
        body: JSON.stringify({
          query: `mutation {
            putProductos(id:"${id}",datos: {
              nombre: "${nombre.value}",
              precio: "${precio.value}",
              foto: "${foto.value}",
            }) {
              id
                nombre
                precio
                foto
            }
           }`
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.data.putProductos){
            window.location.href = '/home';
        }else{
            console.log(data);
        }
      })


})  