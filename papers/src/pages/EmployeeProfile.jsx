// EmployeeProfile.jsx
import React, { useState } from 'react';
// Importamos iconos para los botones
import { FaUserCircle, FaPlus, FaFileExport, FaEdit, FaTrash } from 'react-icons/fa';
// Importamos la data simulada
import { employeeProfileData } from '../hooks/employeeData.js';
import '../components/employeeProfile.css';
import Layout from './Layout.jsx';

function EmployeeProfile() {
  const [activeTab, setActiveTab] = useState("Perfil"); // Estado para manejar la pestaña activa
  const employee = employeeProfileData; // Usamos la data importada

  return (
    <Layout>
        <div className="employee-profile-page">

      {/* --- 1. Encabezado y Barra de Acciones --- */}
      <div className="profile-header-toolbar">
        <h3 className="employee-name-title">Nombre empleado</h3>
        {/* Selector de empleado simulado */}
        <select defaultValue={employee.name} className="employee-selector">
          <option>{employee.name}</option>
          {/* Otros empleados aquí */}
        </select>
        
        <div className="action-buttons-group">
          <button className="toolbar-btn primary-btn"><FaPlus /> Añadir</button>
          <button className="toolbar-btn secondary-btn"><FaFileExport /> Exportar</button>
          <button className="toolbar-btn secondary-btn"><FaEdit /> Editar</button>
          <button className="toolbar-btn delete-btn"><FaTrash /> Eliminar</button>
        </div>
      </div>

      {/* --- 2. Pestañas de Navegación --- */}
      <div className="tabs-container-profile">
        <div 
          className={`tab-profile ${activeTab === "Perfil" ? "active" : ""}`}
          onClick={() => setActiveTab("Perfil")}
        >
          Perfil
        </div>
        {/* Aquí irían otras pestañas como "Facturación", "Historial", etc. */}
      </div>

      {/* --- 3. Contenido del Perfil (Grid de Cajas de Información) --- */}
      {activeTab === "Perfil" && (
        <div className="profile-content-grid">
          
          {/* Bloque: Nombre y Estado */}
          <div className="profile-main-info">
            <FaUserCircle className="profile-avatar-large" />
            <div className="info-text-block">
                <h1 className="profile-name">{employee.name}</h1>
                <span className={`profile-status-toggle ${employee.active ? "active" : "inactive"}`}>
                    Activo <input type="checkbox" checked={employee.active} readOnly />
                </span>
            </div>
          </div>

          {/* Bloque: Rol (Checkbox) */}
          <div className="profile-box role-box">
            <h4>Rol</h4>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" checked={employee.isClient} readOnly /> Cliente
              </label>
              <label>
                <input type="checkbox" checked={employee.isProvider} readOnly /> Proveedor
              </label>
              <label>
                <input type="checkbox" checked={employee.isEmployee} readOnly /> Empleado
              </label>
            </div>
          </div>

          {/* Bloque: Datos Básicos (Columna derecha) */}
          <div className="profile-box basic-data-box">
            <h4>Datos básicos</h4>
            <div className="data-row">
                <p><b>Tipo</b></p>
                <select defaultValue={employee.basic.type} className="data-input-select" disabled>
                    <option>{employee.basic.type}</option>
                </select>
            </div>
            <div className="data-row">
                <p><b>Tipo de identificación</b></p>
                <select defaultValue={employee.basic.idType} className="data-input-select" disabled>
                    <option>{employee.basic.idType}</option>
                </select>
            </div>
            <div className="data-row required">
                <p><b>Identificación</b></p>
                <input type="text" defaultValue={employee.basic.idNumber} readOnly />
            </div>
            {/* Campos de la derecha */}
            <div className="data-column-split">
                <div className="data-column">
                    <div className="data-row required">
                        <p><b>Nombres</b></p>
                        <input type="text" defaultValue={employee.basic.names} readOnly />
                    </div>
                    <div className="data-row required">
                        <p><b>Apellidos</b></p>
                        <input type="text" defaultValue={employee.basic.surnames} readOnly />
                    </div>
                </div>
                <div className="data-column">
                    <div className="data-row">
                        <p><b>Ciudad</b></p>
                        <input type="text" defaultValue={employee.basic.city} readOnly />
                    </div>
                    <div className="data-row">
                        <p><b>Dirección</b></p>
                        <input type="text" defaultValue={employee.basic.address} readOnly />
                    </div>
                </div>
            </div>
          </div>

          {/* Bloque: Datos para Facturación y Envío (Columna izquierda) */}
          <div className="profile-box billing-data-box">
            <h4>Datos para facturación y envío</h4>
            {/* Simplemente usamos inputs de lectura para simular los datos */}
            <div className="data-row">
                <p><b>Nombres del contacto</b></p>
                <input type="text" defaultValue={employee.billing.contactNames} readOnly />
            </div>
            <div className="data-row">
                <p><b>Apellidos del contacto</b></p>
                <input type="text" defaultValue={employee.billing.contactSurnames} readOnly />
            </div>
            <div className="data-row">
                <p><b>Correo electrónico</b></p>
                <input type="text" defaultValue={employee.billing.email} readOnly />
            </div>
            <div className="data-row">
                <p><b>Teléfono</b></p>
                <input type="text" defaultValue={employee.billing.phone} readOnly />
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
}

export default EmployeeProfile;