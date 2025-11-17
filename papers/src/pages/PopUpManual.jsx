import React from "react";
import "../components/PopUp.css";

const PopUpManual = ({ show = false, onConfirm = () => {} }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">

        <h2 className="popup-title">Manual de Usuario</h2>

        <div className="popup-content">
          <p>
            Bienvenido al manual de usuario de Papers, la herramienta de gestión
            diseñada para optimizar las operaciones de nuestra papelería.
          </p>

          <h3>1. Requisitos e Instalación</h3>
          <p>
            <strong>1.1 Requisitos Mínimos:</strong><br />
            • Java Development Kit (JDK) 17+<br />
            • MySQL Driver 8+<br />
          </p>

          <p>
            <strong>1.2 Instalación y Puesta en Marcha:</strong><br />
            1. Confirmar que JDK y MySQL Driver estén instalados.<br />
            2. Ejecutar el backend (archivo .jar).<br />
            3. Abrir navegador e ingresar a: <strong>http://localhost:5173</strong>
          </p>

          <h3>2. Inicio de Sesión y Acceso</h3>
          <p>
            Ingresa tu usuario, contraseña y presiona <strong>Ingresar</strong>.
          </p>

          <h3>3. Gestión de la Papelería</h3>
          <p>
            La aplicación permite gestionar Clientes, Proveedores y Reportes.
          </p>

          <h4>3.1 Gestión de Clientes</h4>
          <p>
            Añadir, consultar y editar clientes mediante la sección correspondiente.
          </p>

          <h4>3.2 Gestión de Proveedores</h4>
          <p>
            Registro y consulta de proveedores.
          </p>

          <h4>3.3 Generación de Reportes</h4>
          <p>
            Reportes de ventas y compras filtrados por fechas.
          </p>

          <h3>4. Cierre de Sesión</h3>
          <p>
            Presiona <strong>Cerrar sesión</strong> cuando termines.
          </p>
        </div>

        <div className="popup-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Ok</button>
        </div>

      </div>
    </div>
  );
};

export default PopUpManual;

