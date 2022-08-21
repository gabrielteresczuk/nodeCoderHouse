import React, { useContext, useEffect, useState } from "react";
import "./Carrito.css";
import CarritoFila from "./CarritoFila";
import { CarritoContext } from "../context/CarritoContext";

function Carrito() {
 
/* ------------- context ------------ */
  const {FETCHURL, carritoId, LimpiarCarritoId } = useContext(CarritoContext);

/* ------------- states ------------- */
  const [carritoDB, setCarritoDB] = useState([]);
  const [total, setTotal] = useState(0);

/* ------------- effect ------------- */
  //carga los datos del carrito
  useEffect(() => {
    if (carritoId) {
      fetch(`${FETCHURL}/api/carrito/${carritoId}/productos`)
        .then((response) => response.json())
        .then((data) => {
          setCarritoDB(data);
        });
    }
  }, [carritoId,FETCHURL]);

  // calcula el total
  useEffect(() => {
    let newTotal = 0;
    carritoDB.forEach((el) => {
      newTotal += parseInt(el.precio);
    });

    setTotal(newTotal);
  }, [carritoDB]);

/* ------------- methods ------------ */
  //borra una fila
  const handleDeleteRow = (id) => {
    let confirmar = window.confirm(`Desea borrar el articulo ${id} ?`);

    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`${FETCHURL}/api/carrito/${carritoId}/productos/${id}`,requestOptions)
        .then((response) => response.json())
        .then((data) => cargarDatos());
    }
  };

  //borra todo el carrito
  const handleDeleteCart = () => {
    let confirmar = window.confirm(`Desea borrar todos los articulos ?`);

    if (confirmar) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`${FETCHURL}/api/carrito/${carritoId}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setCarritoDB([]);
          LimpiarCarritoId();
        });
    }
  };

  //carga los datos al estado
  const cargarDatos = () => {
    fetch(`${FETCHURL}/api/carrito/${carritoId}/productos`)
      .then((response) => response.json())
      .then((data) => {
        setCarritoDB(data);
      });
  };

/* ------------- return ------------- */

  return (
    <div className="Carrito">
      <h1>CARRITO</h1>

      {!carritoDB.length ? (
        <div className="No_hay">El carrito se encuentra vacio</div>
      ) : (
        <div className="Carrito__tabla">
          <table className="table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {carritoDB.map((el, index) => (
                <CarritoFila
                  key={index}
                  el={el}
                  handleDeleteRow={handleDeleteRow}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}></td>
                <td>TOTAL</td>
                <td>${total}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <div className="Carrito__controls">
            <button
              onClick={() => handleDeleteCart(carritoId)}
              className="tabla__eliminar"
            >
              Eliminar Todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
