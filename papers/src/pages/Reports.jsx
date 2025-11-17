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
    const [selectedCategory, setSelectedCategory] = useState(STATIC_REPORT_CATEGORIES[0].id);
    const [selectedReport, setSelectedReport] = useState(STATIC_REPORT_CATEGORIES[0].sections[0]);

    const [reportContent, setReportContent] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeCategory = useMemo(() => 
        STATIC_REPORT_CATEGORIES.find(c => c.id === selectedCategory), 
        [selectedCategory]
    );

    // LÓGICA DE FETCHING (Esta parte ya la tienes perfecta)
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

    // Lógica para cambiar la categoría (Esta lógica ya la tenías bien)
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
                                <tr key={item.identification}>
                                    <td>{item.identification}</td>
                                    {/* ⚠️ CORRECCIÓN PEQUEÑA: 
                                        Tu DTO usa 'names' y 'lastNames' (definido en UserMapper)
                                    */}
                                    <td>{`${item.names} ${item.lastNames || ''}`}</td>
                                    <td>{item.email}</td>
                                    <td>{item.city}</td>
                                    <td>{item.address}</td>
                                    <td>{item.active ? "Activo" : "Inactivo"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        
        // --- ⚠️ CAMBIO 3: AÑADIR ESTE BLOQUE 'IF' ---
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
                                    {/* Usamos (|| 0) como defensa por si el total es null */}
                                    <td>{`$ ${(item.totalSpend || 0).toLocaleString('es-CO')}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        // --- FIN DEL CAMBIO 3 ---

        // C. Fallbacks
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