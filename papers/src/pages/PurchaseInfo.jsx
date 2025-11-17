// purchaseInfo.jsx
import React from 'react';
import PurchaseDocumentsTable from './PurchaseDocumentTable.jsx'; // Importamos la tabla
import '../components/SalesInfo.css';

function PurchaseInfo({ purchase }) { // Recibe el 'purchase' fetchado de Sells.jsx
  return (
    <div className="purchase-info-view">
      {/* El título "Filtro de busqueda" ya se renderiza en Sells.jsx, pero lo incluimos si quieres más control aquí */}
      
      {/* --- 1. Filtro de Búsqueda --- */}
      <div className="search-filter-container">
        
        {/* Fila 1: Filtros de Cliente y N° Factura */}
        <div className="filter-row">
          <label>Proveedor</label>
          {/* Input de Cliente */}
          <div className="input-group">
            <input type="text" placeholder="Buscar" className="text-input" />
            <button className="search-icon-btn">🔍</button>
          </div>

          <label>N° Factura</label>
          {/* Input de N° Factura */}
          <div className="input-group">
            <input type="text" placeholder="Buscar" className="text-input" />
            <button className="search-icon-btn">🔍</button>
          </div>
        </div>
        
        {/* Fila 2: Filtros de Fecha y Botón Buscar */}
        <div className="filter-row date-filters">
          <label>Fecha elaboración</label>
          
          {/* Select de Año */}
          <select defaultValue="2025" className="year-select">
            <option>2025</option>
            <option>2024</option>
          </select>
          
          {/* Select de Rango de Días */}
          <select defaultValue="Últimos 15 días" className="days-select">
            <option>Últimos 15 días</option>
            <option>Últimos 30 días</option>
          </select>
          
          {/* Input de Fecha (Date picker) */}
          <input type="text" defaultValue="24/05/2025" className="date-input" />
          <button className="calendar-icon-btn">📅</button>

          <button className="search-btn">Buscar</button>
        </div>
      </div>

      {/* --- 2. Tabla de Documentos de Ventas --- */}
      {/* Le pasamos la prop 'purchase' que viene de Sells.jsx */}
      <PurchaseDocumentsTable purchase={purchase} />
      
    </div>
  );
}

export default PurchaseInfo;