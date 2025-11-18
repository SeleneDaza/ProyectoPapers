// ProductDetailModal.jsx
import React from 'react';
// Usaremos el mismo CSS del formulario para el fondo y el contenedor
import '../components//ProductFormModal.css';
// Un CSS específico para la lista de detalles
import '../components/ProductDetailModal.css'; 

function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  return (
    // Reutilizamos las clases del backdrop y content del formulario
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Título */}
        <h2>{product.name}</h2>
        
        {/* Cuerpo del modal */}
        <div className="detail-grid">
          <div className="detail-item">
            <strong>Referencia:</strong>
            <p>{product.reference}</p>
          </div>
          <div className="detail-item">
            <strong>Categoría:</strong>
            <p>{product.category || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <strong>Marca:</strong>
            <p>{product.brand || 'N/A'}</p>
          </div>
          <div className="detail-item">
            <strong>Stock Actual:</strong>
            <p>{product.actualStock} unidades</p>
          </div>
          <div className="detail-item price-purchase">
            <strong>Precio Compra:</strong>
            <p>${product.purchasePrice.toFixed(2)}</p>
          </div>
          <div className="detail-item price-sale">
            <strong>Precio Venta:</strong>
            <p>${product.salePrice.toFixed(2)}</p>
          </div>
          <div className="detail-item-full">
            <strong>Descripción:</strong>
            <p>{product.description || 'Sin descripción.'}</p>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="modal-footer">
          <button type="button" className="btn-save" onClick={onClose}>
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailModal;