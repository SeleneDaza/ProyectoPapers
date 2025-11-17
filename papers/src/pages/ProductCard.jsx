// ProductCard.jsx
import React from 'react';

// Cambia 'onSelect' por 'onClick'
function ProductCard({ product, onClick, isSelected }) {

  const cardClassName = `product-card ${isSelected ? 'selected' : ''}`;

  return (
    // Llama a la nueva función 'onClick'
    <div className={cardClassName} onClick={onClick}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <p className="product-name">{product.name}</p>
    </div>
  );
}

export default ProductCard;