import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Dashboard.css";
import logo from "../assets/simplelogo.png";
import PopUp from "./PopUp";

function Sidebar() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" onClick={() => navigate("/datos-empresa")}/>

      <ul className="sidebar-menu">
        <li onClick={() => navigate("/dashboard")}>
          <i className="fas fa-home"></i> Inicio
        </li>
        <li onClick={() => navigate("/ventas")}>
          <i className="fr-signas fa-dolla"></i> Ventas
        </li>
        <li onClick={() => navigate("/compras")}>
          <i className="fas fa-shopping-cart"></i> Compras
        </li>
        <li onClick={() => navigate("/productos")}>
          <i className="fas fa-boxes"></i> Productos y servicios
        </li>
        <li onClick={() => navigate("/usuarios")}>
          <i className="fas fa-users"></i> Usuarios
        </li>
        <li onClick={() => navigate("/reportes")}>
          <i className="fas fa-chart-bar"></i> Reportes
        </li>
      </ul>

      <button
        className="logout-btn"
        onClick={() => setShowPopup(true)}
      >
        <i className="fas fa-arrow-left"></i> Cerrar sesión
      </button>

      {/* POPUP DE CONFIRMACIÓN */}
      <PopUp
        show={showPopup}
        title="Advertencia"
        message="¿Seguro que deseas cerrar sesión?"
        onCancel={() => setShowPopup(false)}
        onConfirm={() => {
          setShowPopup(false);
          navigate("/");
        }}
      />
    </div>
  );
}

export default Sidebar;
