/**
 * Transforma la estructura anidada de la API (Venta + Detalles) 
 * a una lista plana (una fila por cada detalle) para la tabla.
 * * @param {Array<object>} salesData - Lista de SaleDTOs desde la API.
 * @returns {Array<object>} - Lista de objetos planos para renderizar en la tabla.
 */
export function flattenSalesData(salesData) {

    if (!Array.isArray(salesData)) {
    return [];
  }

  const flattenedList = [];

  salesData.forEach(sale => {

    const details = Array.isArray(sale.details) ? sale.details : [];
        
        details.forEach((detail, index) => {
            // ... (tu lógica para construir el objeto plano) ...
            flattenedList.push({
                // Datos del Maestro (Factura)
                invoiceNumber: sale.id, 
                client: sale.clienteName, 
                taxValue: sale.taxes,
                discountValue: sale.discounts,
                totalValue: sale.totalValue,

                product: detail.productId, 
                unitPrice: detail.unitPrice,
                quantity: detail.quantity,
                subtotalValue: detail.subtotal,
                
                isFirstRow: index === 0 
            });
        });
  });

  return flattenedList;
}