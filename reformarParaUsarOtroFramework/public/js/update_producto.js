const id_producto = document.getElementById("id_producto");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const foto = document.getElementById("foto");
const form = document.getElementById("form");

const id = id_producto.value;

/* ------ carga del los campos ------ */
console.log(id);
fetch("http://localhost:8080/productos/" + id)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data) {
      let producto = data;
      nombre.value = producto.nombre;
      precio.value = producto.precio;
      foto.value = producto.foto;
    } else {
      form.innerHTML = `<p>Producto inexistente</p>`;
    }
  });

/* ------ envio del formulario ------ */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch("http://localhost:8080/productos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      nombre: nombre.value,
      precio: precio.value,
      foto: foto.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        window.location.href = "/home";
      } else {
        console.log(data);
      }
    });
});
