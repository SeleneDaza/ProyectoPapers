import React, { useState } from 'react';
import { FaSearch, FaPlus, FaFileExport, FaEdit, FaTrash } from 'react-icons/fa'; 

// --- IMPORTACIONES DE COMPONENTES ---
import ProductCard from './ProductCard';
import Layout from './Layout';
import ProductFormModal from './ProductFormModal';
import ProductDetailModal from './ProductDetailModal'; // <-- Importado

// --- IMPORTACIONES DE LÓGICA ---
import { useProducts } from '../hooks/useProducts';
import api from '../hooks/api.js'; 

// --- ARCHIVOS DE ESTILOS ---
import '../components/ProductsCatalog.css';

// --- CONSTANTES ---
const API_URL = '/api/productos'; // <-- CORREGIDO (basado en tu backend)


function ProductCatalog() {
  // --- HOOKS DE DATOS ---
  const { products, loading, refreshProducts } = useProducts();
  
  // --- HOOKS DE ESTADO ---
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Estados para el Modal de Formulario (Crear/Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); 

  // Estados para el Modal de Detalles (Ver)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [productToView, setProductToView] = useState(null);

  
  // --- MANEJADORES DE EVENTOS ---

  // NUEVA FUNCIÓN: Se llama al hacer clic en CUALQUIER tarjeta
  const handleCardClick = (product) => {
    // 1. Selecciona el ID para habilitar Editar/Borrar
    setSelectedProductId(product.id);
    
    // 2. Establece el producto que se mostrará en el modal de "Ver"
    setProductToView(product);
    
    // 3. Abre el modal de "Ver"
    setIsViewModalOpen(true);
  };

  // Función para CERRAR el modal de Formulario
  const handleCloseFormModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Función para CERRAR el modal de Detalles
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    // No limpiamos el 'productToView' ni 'selectedProductId'
    // para que la tarjeta siga seleccionada al cerrar.
  };

  // --- FUNCIONES CRUD ---

  // (C) CREATE: Abre el modal de Formulario (modo Crear)
  const handleAdd = () => {
    setEditingProduct(null);
    setIsViewModalOpen(false); // Cierra el modal de "Ver" si está abierto
    setIsModalOpen(true);     // Abre el modal de "Formulario"
  };

  // (U) UPDATE: Abre el modal de Formulario (modo Editar)
  const handleEdit = () => {
    if (!selectedProductId) return;
    const productToEdit = products.find(p => p.id === selectedProductId);
    setEditingProduct(productToEdit);
    setIsViewModalOpen(false); // Cierra el modal de "Ver"
    setIsModalOpen(true);     // Abre el modal de "Formulario"
  };

  // (D) DELETE
  const handleDelete = async () => {
    if (!selectedProductId) return;
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await api.delete(`${API_URL}/${selectedProductId}`);
        await refreshProducts();
        setSelectedProductId(null);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <Layout>
    <div className="product-catalog-view">
      
      {/* --- 1. Barra de Herramientas --- */}
      <div className="toolbar-container-inline">
        
        {/* Input de Búsqueda (sin funcionalidad aún) */}
        <div className="search-input-group-inline">
          <input type="text" placeholder="Ingrese el nombre del producto" className="search-input-compact"/>
          <FaSearch className="search-icon-compact" />
        </div>

        {/* Botones de Acción */}
        <div className="action-buttons-group-inline">
          <button className="toolbar-btn inline-btn add-btn-inline" onClick={handleAdd}>
            <FaPlus /> Añadir
          </button>
          <button className="toolbar-btn inline-btn export-btn-inline">
            <FaFileExport /> Exportar
          </button>
          <button className="toolbar-btn inline-btn edit-btn-inline" onClick={handleEdit} disabled={!selectedProductId}>
            <FaEdit /> Editar
          </button>
          <button className="toolbar-btn inline-btn delete-btn-inline" onClick={handleDelete} disabled={!selectedProductId}>
            <FaTrash /> Eliminar
          </button>
        </div>
      </div>

      {/* --- 2. Grid de Productos --- */}
      <div className="products-grid-container">
        {loading && <p>Cargando productos...</p>}
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            // CAMBIO IMPORTANTE: Llama a la nueva función de clic
            onClick={() => handleCardClick(product)}
            // Sigue resaltando si está seleccionado
            isSelected={product.id === selectedProductId}
          />
        ))}
      </div>

      {/* --- 3. Modal de Creación/Edición --- */}
      {isModalOpen && (
        <ProductFormModal 
          product={editingProduct}
          onClose={handleCloseFormModal} 
          onSave={async (formData) => {
            try {
              if (editingProduct) {
                await api.put(`${API_URL}/${editingProduct.id}`, formData);
              } else {
                await api.post(API_URL, formData);
              }
              handleCloseFormModal();
              await refreshProducts();
              setSelectedProductId(null);
            } catch (error) {
              console.error("Error al guardar:", error);
            }
          }}
        />
      )}
      
      {/* --- 4. Modal de Detalles (Ver) --- */}
      {isViewModalOpen && (
        <ProductDetailModal
          product={productToView}
          onClose={handleCloseViewModal}
        />
      )}
      
    </div>
    </Layout>
  );
}

export default ProductCatalog;