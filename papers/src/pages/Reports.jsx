// Reports.jsx
import React, { useState, useEffect, useMemo } from 'react';
import api from '../hooks/api.js'; // Importamos la nueva función
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
                
                if (selectedReport === 'Listado de Clientes') {
                    endpoint = '/reportes/listado-clientes';
                } 
                // ⚠️ CAMBIO 1: Añadir el 'else if' para Proveedores
                else if (selectedReport === 'Detalle de Proveedores') { 
                    endpoint = '/reportes/listado-proveedores';
                } 
                // --- Fin Cambio 1 ---
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
        
        // ⚠️ CAMBIO 2: Modificar el 'if' para que incluya ambos reportes
        if (
            (selectedReport === 'Listado de Clientes' || selectedReport === 'Detalle de Proveedores') && 
            Array.isArray(reportContent)
        ) {
            
            if (reportContent.length === 0) {
                // Mensaje específico
                if (selectedReport === 'Listado de Clientes') {
                    return <p>No se encontraron clientes para mostrar.</p>;
                } else {
                    return <p>No se encontraron proveedores para mostrar.</p>;
                }
            }

            // Si hay datos, dibujamos la tabla (es la misma tabla para ambos)
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
                            {/* 'item' puede ser un cliente o un proveedor (UserDTO) */}
                            {reportContent.map((item) => (
                                <tr key={item.identificacion}>
                                    <td>{item.identificacion}</td>
                                    {/* Usamos los nombres del DTO: 
                                      'names', 'lastNames', 'city', 'address' 
                                    */}
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
        // --- Fin Cambio 2 ---


        // B. Fallback para reportes (JSON) que no sabemos cómo renderizar
        if (reportContent && !Array.isArray(reportContent)) {
             return <p>El formato de este reporte (JSON) no es reconocido.</p>;
        }

        // C. Fallback por si 'reportContent' está vacío
        return <p className="initial-message">Seleccione un reporte para su vista previa</p>;
    };


    return (
        <Layout>
            {/* TU ESTRUCTURA JSX (INTACTA) */}
            <div className="reports-page-layout">
            
            {/* Columna Izquierda: Navegación/Filtros */}
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

                {/* Lista de reportes detallados de la categoría activa */}
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

            {/* Columna Derecha: Visualizador de Reporte */}
            <div className="report-visualizer">
                <div className="report-viewer-content">
                    {/* Aquí se renderiza la tabla */}
                    {renderReportContent()}
                </div>

                {/* Controles de Paginas/PDF */}
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