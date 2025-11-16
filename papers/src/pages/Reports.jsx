// Reports.jsx
import React, { useState, useEffect, useMemo } from 'react';
// import { reportCategories } from '../hooks/reportsData.js'; <-- YA NO SE USA
import { fetchReportPreview } from '../hooks/reportsData.js'; // Importamos la nueva función
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

    // Encuentra la categoría activa (ahora usando useMemo para optimización)
    const activeCategory = useMemo(() => 
        STATIC_REPORT_CATEGORIES.find(c => c.id === selectedCategory), 
        [selectedCategory]
    );

    // LÓGICA DE FETCHING DINÁMICO
    useEffect(() => {
        if (!selectedReport) {
            setReportContent(null);
            return;
        }

        setIsLoading(true);
        setReportContent(null);
        setError(null);

        fetchReportPreview(selectedReport)
            .then(content => {
                setReportContent(content);
            })
            .catch(err => {
                console.error("Error fetching report:", err);
                setError("Hubo un error al cargar la vista previa del reporte.");
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [selectedReport]); // Depende únicamente del reporte seleccionado

    // Lógica para cambiar la categoría y seleccionar el primer reporte de esa categoría
    const handleCategoryChange = (categoryId) => {
        const newCategory = STATIC_REPORT_CATEGORIES.find(c => c.id === categoryId);
        setSelectedCategory(categoryId);
        // Selecciona automáticamente el primer reporte de la nueva categoría
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
        if (reportContent) {
            return (
                <div className="report-preview-html">
                    {/* Renderiza el HTML simulado. En React real, usarías una librería de PDF o charts aquí. */}
                    <div dangerouslySetInnerHTML={{ __html: reportContent }} /> 
                    <hr/>
                    <p className="preview-note">Esta es una simulación de la vista previa del reporte.</p>
                </div>
            );
        }
        return <p className="initial-message">Seleccione un reporte para su vista previa</p>;
    };


    return (
        <Layout>
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