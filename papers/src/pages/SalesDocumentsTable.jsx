// SalesDocumentsTable.js
import React from 'react';

// Función de ayuda para formatear a COP (asumiendo que los datos vienen como números)
const formatCOP = (amount) => `${amount.toLocaleString('es-CO')} COP`;

function SalesDocumentsTable({ sales }) {
  // Los títulos de las columnas, tal como se ven en la imagen
  const headers = [
    'N° Factura',
    'Cliente',
    'Producto',
    'Precio unitario',
    'Cantidad',
    'Valor subtotal',
    'Valor impuestos',
    'Valor descuentos',
    'Valor total',
  ];

  if (!sales || sales.length === 0) {
    return <p className="no-data">No hay documentos de ventas para mostrar.</p>;
  }

  return (
    <div className="sales-table-container">
      <table className="sales-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              // Usamos un índice como key, ya que el orden es fijo
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Mapeamos los datos recibidos por prop para crear las filas */}
          {sales.map((sale, index) => (
            <tr key={sale.invoiceNumber || index}>
              <td>{sale.invoiceNumber}</td>
              <td>{sale.client}</td>
              <td>{sale.product}</td>
              <td>{formatCOP(sale.unitPrice)}</td>
              <td>{sale.quantity}</td>
              <td>{formatCOP(sale.subtotalValue)}</td>
              <td>{formatCOP(sale.taxValue)}</td>
              <td>{formatCOP(sale.discountValue)}</td>
              <td>{formatCOP(sale.totalValue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesDocumentsTable;