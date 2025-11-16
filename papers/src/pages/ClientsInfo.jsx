import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../components/ClientsInfo.css";

function ClientInfo({ client }) {
     if (!client) {
    return (
      <div className="client-container">
        <p className="loading">Cargando información del cliente...</p>
      </div>
    );
  }

  const fullName = (client.nombres || client.apellidos) 
                   ? `${client.nombres || ''} ${client.apellidos || ''}` 
                   : "Sin nombre";
  
  const roleText = (client.roles && client.roles.length > 0) 
                   ? client.roles.join(', ')
                   : "N/A";

  return (
    <div className="client-container">
      <div className="client-header">
        <FaUserCircle className="client-avatar" />
        <div>
          <h3 className="client-name">{fullName}</h3>
          <p className={`client-status ${client.active ? "active" : "inactive"}`}>
            {client.active ? "Activo" : "Inactivo"}
          </p>
        </div>
      </div>

      <div className="client-sections">
        <div className="client-box">
          <h4>Rol</h4>
          <p>{roleText}</p>
        </div>

        <div className="client-box">
          <h4>Datos básicos</h4>
          <p><b>Tipo:</b> {client.tipoIdentificacion || "N/A"}</p>
          <p><b>Identificación:</b> {client.identificacion || "N/A"}</p>
        </div>

        <div className="client-box">
          <h4>Datos de contacto</h4>
          <p><b>Correo:</b> {client.email || "N/A"}</p>
          <p><b>Ciudad:</b> {client.city || "N/A"}</p>
          <p><b>Dirección:</b> {client.address || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
