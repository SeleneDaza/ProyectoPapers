// Reports.jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../hooks/api.js'; 
import '../components/Reports.css';
import Layout from './Layout.jsx';

const STATIC_REPORT_CATEGORIES = [
    { id: 'clients', name: 'Clientes y Proveedores', sections: ['Listado de Clientes', 'Detalle de Proveedores', 'Saldos Pendientes'] },
    { id: 'purchases', name: 'Compras y gastos', sections: ['Gastos por Categoría', 'Facturas de Compra', 'Reporte de Compras'] },
];

function Reports() {
    // ... (hooks: useState, useMemo) ...
    const [selectedCategory, setSelectedCategory] = useState(STATIC_REPORT_CATEGORIES[0].id);
    const [selectedReport, setSelectedReport] = useState(STATIC_REPORT_CATEGORIES[0].sections[0]);
    const [reportContent, setReportContent] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeCategory = useMemo(() => 
        STATIC_REPORT_CATEGORIES.find(c => c.id === selectedCategory), 
        [selectedCategory]
    );


    // LÓGICA DE FETCHING DINÁMICO
    useEffect(() => {
        const loadReport = async () => {
            if (!selectedReport) return;
            setIsLoading(true);
            setError(null);
            setReportContent(null); 

            try {
                let endpoint = '';
                
                if (selectedReport === 'Listado de Clientes') {
                    endpoint = '/reportes/listado-clientes';
                } 
                else if (selectedReport === 'Detalle de Proveedores') { 
                    endpoint = '/reportes/listado-proveedores';
                }
                else if (selectedReport === 'Gastos por Categoría') {
                    endpoint = '/reportes/gastos-por-categoria';
                } 
                else if (selectedReport === 'Reporte de Compras') {
                    endpoint = '/reportes/reporte-compras';
                }
                // 1. ⚠️ AÑADIR EL NUEVO 'ELSE IF'
                else if (selectedReport === 'Facturas de Compra') {
                    endpoint = '/reportes/facturas-compra';
                }
                else {
                    throw new Error(`El reporte "${selectedReport}" aún no está implementado.`);
                }
                const response = await api.get(endpoint);
                setReportContent(response.data); 

            } catch (err) {
                console.error("Error al cargar el reporte:", err);
                const errorMsg = err.response ? err.response.data.message : err.message;
                setError(errorMsg || "No se pudo cargar el reporte.");
            } finally {
                setIsLoading(false);
            }
        };
        loadReport();
    }, [selectedReport]); 

    // ... (handleCategoryChange) ...
    const handleCategoryChange = (categoryId) => {
        const newCategory = STATIC_REPORT_CATEGORIES.find(c => c.id === categoryId);
        setSelectedCategory(categoryId);
        if (newCategory && newCategory.sections.length > 0) {
            setSelectedReport(newCategory.sections[0]);
        } else {
            setSelectedReport(null);
        }
    };


    // --- Renderizado del Contenido del Visualizador ---
    const renderReportContent = () => {
        // ... (if isLoading, if error) ...
        if (isLoading) { return <p className="loading-message">Cargando...</p>; }
        if (error) { return <p className="error-message">{error}</p>; }
        
        // A. Renderizado Clientes/Proveedores (Tabla 1)
        if (
            (selectedReport === 'Listado de Clientes' || selectedReport === 'Detalle de Proveedores') && 
            Array.isArray(reportContent)
        ) {
            if (reportContent.length === 0) return <p>No se encontraron datos.</p>;
            return (
                <div className="report-table-container">
                    <h3>{selectedReport}</h3>
                    <table className="report-table">
                        {/* ... (Tu <thead> de Clientes) ... */}
                        <thead>
                            <tr>
                                <th>Identificación</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Ciudad</th>
                                <th>Dirección</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportContent.map((item) => (
                                <tr key={item.identificacion}>
                                    <td>{item.identificacion}</td>
                                    <td>{`${item.nombres} ${item.apellidos || ''}`}</td>
                                    <td>{item.email}</td>
                                    <td>{item.ciudad}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.active ? "Activo" : "Inactivo"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        
        // B. Renderizado Gastos (Tabla 2)
        if (selectedReport === 'Gastos por Categoría' && Array.isArray(reportContent)) {
            if (reportContent.length === 0) return <p>No se encontraron gastos.</p>;
            return (
                <div className="report-table-container">
                    <h3>{selectedReport}</h3>
                    <table className="report-table">
                        {/* ... (Tu <thead> de Gastos) ... */}
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Total Gastado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportContent.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.category}</td>
                                    <td>{`$ ${(item.totalSpend || 0).toLocaleString('es-CO')}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // C. Renderizado Reporte de Compras (Tabla 3)
        if (selectedReport === 'Reporte de Compras' && Array.isArray(reportContent)) {
            if (reportContent.length === 0) return <p>No se encontraron compras.</p>;
            return (
                <div className="report-table-container">
                    <h3>{selectedReport}</h3>
                    <table className="report-table">
                        {/* ... (Tu <thead> de Reporte Compras) ... */}
                        <thead>
                            <tr>
                                <th>ID Compra</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Proveedor</th>
                                <th>Identificación Proveedor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportContent.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.date}</td>
                                    <td>{`$ ${(item.totalValue || 0).toLocaleString('es-CO')}`}</td>
                                    <td>{item.supplierName}</td>
                                    <td>{item.supplierIdentification}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // 2. ⚠️ AÑADIR EL NUEVO BLOQUE 'IF'
        // D. Renderizado Facturas de Compra (Tabla 4)
        if (selectedReport === 'Facturas de Compra' && Array.isArray(reportContent)) {
            if (reportContent.length === 0) {
                return <p>No se encontraron detalles de facturas para mostrar.</p>;
            }
            return (
                <div className="report-table-container">
                    <h3>{selectedReport}</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>ID Factura</th>
                                <th>Fecha</th>
                                <th>Proveedor</th>
                                <th>Ref. Producto</th>
                                <th>Producto</th>
                                <th>Cant.</th>
                                <th>Vlr. Unit.</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportContent.map((item, index) => (
                                <tr key={index}> {/* Usamos index porque el ID de la factura se repite */}
                                    <td>{item.purchaseId}</td>
                                    <td>{item.purchaseDate}</td>
                                    <td>{item.supplierName}</td>
                                    <td>{item.productReference}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{`$ ${(item.unitPrice || 0).toLocaleString('es-CO')}`}</td>
                                    <td>{`$ ${(item.subtotal || 0).toLocaleString('es-CO')}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // --- Fallbacks ---
        if (reportContent) {
             return <p>El formato de este reporte no es reconocido.</p>;
        }
        return <p className="initial-message">Seleccione un reporte para su vista previa</p>;
    };


    return (
        <Layout>
            {/* TU ESTRUCTURA JSX (INTACTA) */}
            <div className="reports-page-layout">
            
            <div className="reports-sidebar">
                
                <h3 className="sidebar-title">Categorías de Reportes</h3> 
                <div className="report-categories-list">
                    {STATIC_REPORT_CATEGORIES.map(category => (
                        <div 
                            key={category.id}
                            className={`report-category-item ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            <span className="arrow-icon">▶</span> {category.name}
                        </div>
                    ))}
                </div>
                {activeCategory && (
                    <div className="report-sections-detail">
                        <h4 className="detail-title">{activeCategory.name}</h4>
                        {activeCategory.sections.map((section, index) => (
                            <p 
                                key={index} 
                                className={`report-section-link ${selectedReport === section ? 'selected' : ''}`}
                                onClick={() => setSelectedReport(section)}
                            >
                                {section}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            <div className="report-visualizer">
                <div className="report-viewer-content">
                    {renderReportContent()}
                </div>
                <div className="pagination-and-export">
                    <div className="pagination-controls">
                        <button className="page-control">{"<"}</button>
                        <span className="page-number">--</span>
                        <span className="page-number">--</span>
                        <button className="page-control">{">"}</button>
                    </div>
                    <button className="export-pdf-btn">
                        📄
                    </button>
                </div>
            </div>

        </div>
        </Layout>
    );
}

export default Reports;