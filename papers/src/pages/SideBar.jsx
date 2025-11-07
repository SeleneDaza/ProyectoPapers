import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Dashboard.css";
import logo from "../assets/simplelogo.png";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />

      <ul className="sidebar-menu">
        <li onClick={() => navigate("/dashboard")}>
          <i className="fas fa-home"></i> Inicio
        </li>
        <li onClick={() => navigate("/ventas")}>
          <i className="fas fa-dollar-sign"></i> Ventas
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

      <button className="logout-btn" onClick={() => navigate("/")}>
        <i className="fas fa-arrow-left"></i> Cerrar sesión
      </button>
    </div>
  );
}

export default Sidebar;
