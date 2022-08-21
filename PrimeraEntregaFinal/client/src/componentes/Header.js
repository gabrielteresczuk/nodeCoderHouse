import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

function Header() {

/* ------------- context ------------ */

  const { admin, handleAdmin } = useContext(CarritoContext);

/* ------------- return ------------- */

  return (
    <div className="Header">
      <h1 className="Header__logo">
        <strong>Virtual</strong>
        <span>STORE</span>
      </h1>
      <ul className="Header__ul">
        <li>
          <Link to={"/"}>Productos</Link>
        </li>
        <li>
          <Link to={"/Carrito"}>Carrito</Link>
        </li>
      </ul>

      <div className="Header__admin">
        ADMIN
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleAdmin}
            defaultChecked={admin}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}

export default Header;
