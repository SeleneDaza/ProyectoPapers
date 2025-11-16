// hooks/salesData.js (Adaptado para tu estructura)

// Datos que el backend retornaría
export const rawSalesData = [
  {
    invoiceNumber: '008933',
    client: 'Juan Carlos Gómez Ayala',
    product: 'Cuaderno 50 hojas',
    unitPrice: 2700,
    quantity: 2,
    subtotalValue: 5400,
    taxValue: 0,
    discountValue: 0,
    totalValue: 5400,
  },
  // Agrega más objetos si quieres más filas
];

// Función simulada de fetching
export const fetchSalesData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(rawSalesData); // Devuelve los datos brutos
    }, 500); // Simula un retraso de red
  });
};

// Función de ayuda para formatear a COP
const formatCOP = (amount) => `${amount.toLocaleString('es-CO')} COP`;

// NOTA: Tu componente SalesInfo recibirá este array.