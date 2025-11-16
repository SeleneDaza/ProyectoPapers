// ProductCard.jsx
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* Usamos el atributo 'image' de los datos */}
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      {/* Usamos el atributo 'name' de los datos */}
      <p className="product-name">{product.name}</p>
    </div>
  );
}

export default ProductCard;