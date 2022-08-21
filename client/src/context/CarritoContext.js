import React, { useState } from "react";
import { createContext } from "react";

export const CarritoContext = createContext();

function CarritoContextContenedor({ children }) {
  /* ------ constante de conexion ----- */

  const FETCHURL = "https://sunrise-reliable-droplet.glitch.me/";

  /* -------------- state ------------- */
  const [carritoId, setCarritoId] = useState(JSON.parse(localStorage.getItem("CarritoId")) || null);
  const [admin, setAdmin] = useState(true);

/* ------------- methods ------------ */
  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const AgregarCarritoId = (id) => {
    localStorage.setItem("CarritoId", JSON.stringify(id));
    setCarritoId(id);
  };

  const LimpiarCarritoId = () => {
    localStorage.setItem("CarritoId", JSON.stringify(""));
    setCarritoId(null);
  };

/* ------------- return ------------- */
  return (
    <CarritoContext.Provider
      value={{
        FETCHURL,
        admin,
        carritoId,
        handleAdmin,
        AgregarCarritoId,
        LimpiarCarritoId,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoContextContenedor;
