// ProductFormModal.jsx
import React, { useState, useEffect } from 'react';
import '../components//ProductFormModal.css';

// 1. Estado inicial CORREGIDO para coincidir con ProductDetailDTO
const initialState = {
  name: '',
  reference: '',  // <-- AÑADIDO
  description: '',
  purchasePrice: 0, // <-- AÑADIDO
  salePrice: 0,     // <-- 'price' renombrado a 'salePrice'
  actualStock: 0,   // <-- 'stock' renombrado a 'actualStock'
  brand: '',        // <-- AÑADIDO
  category: '',     // <-- AÑADIDO
  image: ''
};

function ProductFormModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(initialState);
  const isEditing = Boolean(product);

  useEffect(() => {
    if (isEditing) {
      setFormData(product);
    } else {
      setFormData(initialState);
    }
  }, [product, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <h2>{isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
        
        <form onSubmit={handleSubmit}>
          
          <div className="form-row">
            {/* 2. Añadimos los inputs que faltaban y corregimos los nombres */}
            <div className="form-group">
              <label>Nombre del Producto</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Referencia (SKU)</label>
              <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio de Compra</label>
              <input type="number" name="purchasePrice" step="0.01" min="0" value={formData.purchasePrice} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Precio de Venta</label>
              <input type="number" name="salePrice" step="0.01" min="0" value={formData.salePrice} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Stock Actual</label>
              <input type="number" name="actualStock" min="0" value={formData.actualStock} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Marca</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group">
            <label>URL de la Imagen</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-save">{isEditing ? 'Guardar Cambios' : 'Crear Producto'}</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ProductFormModal;