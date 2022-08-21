import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import "./Productos.css";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";
import { CarritoContext } from "../context/CarritoContext";

function Productos() {

/* ------------- context ------------ */

  const {FETCHURL, admin } = useContext(CarritoContext);

/* ------------- states ------------- */

  const [productosDB, setProductosDB] = useState(null);

/* ------------- effect ------------- */

  useEffect(() => {
    fetch(`${FETCHURL}/api/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProductosDB(data);
      });
  }, [FETCHURL]);

  /* ------------- methods ------------ */

  // borra 1 producto
  const handleDelete = (id) => {

    let confirmar = window.confirm(`Desea borrar el articulo ${id} ?`);

    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`${FETCHURL}/api/productos/` + id, requestOptions)
        .then((response) => response.json())
        .then((data) => cargarDatos());
    }
  };

  // recarga el state ProductosDB
  const cargarDatos = () => {
    fetch(`${FETCHURL}/api/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProductosDB(data);
      });
  };

  /* ------------- return ------------- */

  return (
    <div className="Productos">
      <h1>PRODUCTOS</h1>
      {!productosDB ? (
        <Loader />
      ) : (
        <>
          {admin && (
            <div className="Productos_admin">
              <NavLink className="Productos__btn" to={"/Productos/form"}>
                Cargar un Producto +
              </NavLink>
            </div>
          )}

          <div className="Cards__container">
            {productosDB.map((producto) => (
              <Card
                admin={admin}
                key={producto.id}
                producto={producto}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Productos;
