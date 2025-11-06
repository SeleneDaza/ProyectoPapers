// hooks/reportLogic.js

/**
 * Simula la obtención de la vista previa para un reporte específico.
 * @param {string} reportName - Nombre del reporte seleccionado (ej: "Ventas por Cliente").
 * @returns {Promise<string>} Promesa que resuelve con el contenido HTML simulado del reporte.
 */
export const fetchReportPreview = (reportName) => {
    console.log(`Simulando fetch para el reporte: ${reportName}`);

    const mockContent = {
        'Ventas por Cliente': `<h3>REPORTE DE VENTAS POR CLIENTE</h3><p>Mostrando datos detallados de ventas para los 10 principales clientes del último trimestre. (Simulación de tabla de datos)</p>`,
        'Listado de Clientes': `<h3>LISTADO DE CLIENTES Y PROVEEDORES</h3><p>Total de clientes activos: 154. Total de proveedores: 28. (Simulación de listado con filtros)</p>`,
        'Gastos por Categoría': `<h3>GASTOS POR CATEGORÍA</h3><p>El gasto principal fue en "Arriendo" (45%) y "Suministros" (30%). (Simulación de gráfico de pastel)</p>`,
        
        // Contenido por defecto
        'default': `<h3>Contenido del Reporte: ${reportName}</h3><p>Este es el contenido simulado del reporte. Aquí se cargaría un PDF, gráfico o tabla de datos real.</p>`
    };

    return new Promise(resolve => {
        setTimeout(() => {
            // Devuelve el contenido mock o el contenido por defecto
            resolve(mockContent[reportName] || mockContent['default']); 
        }, 500); // Simula retraso de carga
    });
};