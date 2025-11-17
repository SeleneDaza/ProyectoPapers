// Reports.jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../hooks/api.js'; // 👈 Importamos el API real
import '../components/Reports.css';
import Layout from './Layout.jsx';

// 1. DEFINICIÓN ESTRUCTURAL DE CATEGORÍAS (FIJAS)
const STATIC_REPORT_CATEGORIES = [
    { id: 'clients', name: 'Clientes y Proveedores', sections: ['Listado de Clientes', 'Detalle de Proveedores', 'Saldos Pendientes'] },
    { id: 'purchases', name: 'Compras y gastos', sections: ['Gastos por Categoría', 'Facturas de Compra', 'Reporte de Compras'] },
];

function Reports() {
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
                
                // Mapeo de nombres a endpoints
                if (selectedReport === 'Listado de Clientes') {
                    endpoint = '/reportes/listado-clientes';
                } 
                else if (selectedReport === 'Detalle de Proveedores') { 
                    endpoint = '/reportes/listado-proveedores';
                }
                else if (selectedReport === 'Gastos por Categoría') {
                    endpoint = '/reportes/gastos-por-categoria';
                } 
                else if (selectedReport === 'Reporte de Compras') { // 👈 Reporte nuevo
                    endpoint = '/reportes/reporte-compras';
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

    // Lógica para cambiar la categoría
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
        if (!selectedReport) {
            return <p className="initial-message">Seleccione un reporte para su vista previa</p>;
        }
        if (isLoading) {
            return <p className="loading-message">Cargando vista previa de "{selectedReport}"...</p>;
        }
        if (error) {
            return <p className="error-message">{error}</p>;
        }
        
        // A. Renderizado de Clientes y Proveedores
        if (
            (selectedReport === 'Listado de Clientes' || selectedReport === 'Detalle de Proveedores') && 
            Array.isArray(reportContent)
        ) {
            if (reportContent.length === 0) {
                 return <p>No se encontraron datos para este reporte.</p>;
            }
            return (
                <div className="report-table-container">
                    <h3>{selectedReport}</h3>
                    <table className="report-table">
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
        
        // B. Renderizado para 'Gastos por Categoría'
        if (selectedReport === 'Gastos por Categoría' && Array.isArray(reportContent)) {
            if (reportContent.length === 0) {
                return <p>No se encontraron gastos para mostrar.</p>;
            }
            return (
                <div className="report-table-container">
                    <h3>{selectedReport}</h3>
                    <table className="report-table">
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

        // C. Renderizado para 'Reporte de Compras' (El nuevo)
        if (selectedReport === 'Reporte de Compras' && Array.isArray(reportContent)) {
            if (reportContent.length === 0) {
                return <p>No se encontraron compras para mostrar.</p>;
            }
            return (
                <div className="report-table-container">
                    <h3>{selectedReport}</h3>
                    <table className="report-table">
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

        // --- Fallbacks ---
        if (reportContent && !Array.isArray(reportContent)) {
             return <p>El formato de este reporte (JSON) no es reconocido.</p>;
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