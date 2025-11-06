import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../components/SuppliersInfo.css";

function SupplierInfo({ supplier }) {
     if (!supplier) {
    return (
      <div className="supplier-container">
        <p className="loading">Cargando información del proveedor...</p>
      </div>
    );
  }

  return (
    <div className="supplier-container">
      <div className="supplier-header">
        <FaUserCircle className="supplier-avatar" />
        <div>
          <h3 className="supplier-name">{supplier.name || "Sin nombre"}</h3>
          <p className={`supplier-status ${supplier.active ? "active" : "inactive"}`}>
            {supplier.active ? "Activo" : "Inactivo"}
          </p>
        </div>
      </div>

      <div className="supplier-sections">
        <div className="supplier-box">
          <h4>Rol</h4>
          <p>{supplier.role || "N/A"}</p>
        </div>

        <div className="supplier-box">
          <h4>Datos básicos</h4>
          <p><b>Tipo:</b> {supplier.idType || "N/A"}</p>
          <p><b>Identificación:</b> {supplier.idNumber || "N/A"}</p>
        </div>

        <div className="supplier-box">
          <h4>Datos de contacto</h4>
          <p><b>Correo:</b> {supplier.email || "N/A"}</p>
          <p><b>Ciudad:</b> {supplier.city || "N/A"}</p>
          <p><b>Dirección:</b> {supplier.address || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default SupplierInfo;
