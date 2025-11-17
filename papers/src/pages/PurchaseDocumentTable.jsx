// SalesDocumentsTable.js
import React from 'react';

// Función de ayuda para formatear a COP (asumiendo que los datos vienen como números)
const formatCOP = (amount) => `${(amount || 0).toLocaleString('es-CO')} COP`;

function PurchaseDocumentsTable({ purchase }) {
  // Los títulos de las columnas, tal como se ven en la imagen
  const headers = [
    'N° Factura',
    'Proveedor',
    'Producto',
    'Precio unitario',
    'Cantidad',
    'Valor subtotal',
    'Valor impuestos',
    'Valor descuentos',
    'Valor total',
  ];

  if (!purchase || purchase.length === 0) {
    return <p className="no-data">No hay documentos de compras para mostrar.</p>;
  }

  return (
    <div className="purchase-table-container">
      <table className="purchase-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              // Usamos un índice como key, ya que el orden es fijo
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* ⚠️ CAMBIO: 'sale' -> 'item' y 'client' -> 'supplier' */}
          {purchase.map((item, index) => (
            <tr key={`${item.invoiceNumber}-${index}`}>
              <td>{item.invoiceNumber}</td>
              <td>{item.supplier}</td> {/* Accede al campo 'supplier' aplanado */}
              <td>{item.product}</td>
              <td>{formatCOP(item.unitPrice)}</td>
              <td>{item.quantity}</td>
              <td>{formatCOP(item.subtotal)}</td>
              <td>{formatCOP(item.taxes)}</td>
              <td>{formatCOP(item.discounts)}</td>
              <td>{formatCOP(item.totalValue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseDocumentsTable;