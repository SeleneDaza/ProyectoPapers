/**
 * Transforma la estructura anidada de la API (PurchaseDTO)
 * a una lista plana para la tabla de documentos.
 * * ⚠️ CORREGIDO: Se usan las mismas claves JSON que el módulo de Ventas
 * (ej: 'userId', 'productId', 'taxes', 'totalValue')
 */
export function flattenPurchaseData(purchaseData) {
  
  if (!Array.isArray(purchaseData) || purchaseData.length === 0) {
    return [];
  }

  const flattenedList = [];

  purchaseData.forEach(purchase => {
    
    // Asegurarse de que 'details' exista y sea un array
    if (Array.isArray(purchase.details)) {
      
      purchase.details.forEach((detail, index) => {
        flattenedList.push({
          // --- Datos del Maestro (Purchase) ---
          // El backend envía 'id' (N° Factura)
          invoiceNumber: purchase.id, 
          
          // El backend envía 'proveedorNombre' o 'userId' (siguiendo el patrón de Sale)
          supplier: purchase.proveedorNombre || purchase.userId, 
          
          // El backend envía 'taxes', 'discounts', 'totalValue'
          taxValue: purchase.taxes,
          discountValue: purchase.discounts,
          totalValue: purchase.totalValue,

          // --- Datos del Detalle (DetailPurchase) ---
          // El backend envía 'productId', 'quantity', 'unitPrice', 'subtotal'
          product: detail.productId, 
          unitPrice: detail.unitPrice,
          quantity: detail.quantity,
          subtotalValue: detail.subtotal,
        });
      });
    }
  });

  return flattenedList;
}