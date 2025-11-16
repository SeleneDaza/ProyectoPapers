// ProductCatalog.jsx
import React from 'react';
// Asumiendo que usarás iconos para los botones
import { FaSearch, FaPlus, FaFileExport, FaEdit, FaTrash } from 'react-icons/fa'; 

import ProductCard from './ProductCard';
import { productsData } from '../hooks/productsData'; // Importamos la data
import '../components/ProductsCatalog.css';
import Layout from './Layout';

function ProductCatalog() {
  // En una aplicación real, usarías useState y un filtro para 'products'
  const products = productsData; // Usamos la data importada directamente

  return (
    <Layout>
    <div className="product-catalog-view">
      
      {/* --- 1. Barra de Herramientas Superior --- */}
      <div className="toolbar-container-inline"> {/* Nuevo nombre de clase para el layout de fila */}
        
        {/* Input de Búsqueda (Ahora más compacto y en línea) */}
        <div className="search-input-group-inline">
          <input 
            type="text" 
            placeholder="Ingrese el nombre del producto o servicio" 
            className="search-input-compact"
          />
          {/* El icono de búsqueda se mueve DENTRO del input-group según la segunda imagen adjunta */}
          <FaSearch className="search-icon-compact" />
        </div>

        {/* Botones de Acción (Pequeños, blancos, en línea) */}
        <div className="action-buttons-group-inline">
          <button className="toolbar-btn inline-btn add-btn-inline">
            <FaPlus /> Añadir
          </button>
          <button className="toolbar-btn inline-btn export-btn-inline">
            <FaFileExport /> Exportar
          </button>
          <button className="toolbar-btn inline-btn edit-btn-inline">
            <FaEdit /> Editar
          </button>
          <button className="toolbar-btn inline-btn delete-btn-inline">
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>

      {/* --- 2. Grid de Productos (Se mantiene igual) --- */}
      <div className="products-grid-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
    </Layout>
  );
}

export default ProductCatalog;