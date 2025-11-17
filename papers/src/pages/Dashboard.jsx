// components/Dashboard.jsx
import React from "react";
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate para la navegación
import "../components/Dashboard.css";
import Layout from "./Layout.jsx"; // Asumiendo que Sidebar y Header se manejan dentro de Layout

function Dashboard() {
    const navigate = useNavigate(); // Inicializa el hook de navegación

    // Función para manejar el clic en el botón de "Registrar compra o gasto"
    const handleRegisterPurchase = () => {
        navigate('/register-purchase'); // Redirige a la ruta /register-purchase
    };

    // Función para manejar el clic en el botón de "Registrar una venta"
    const handleRegisterSale = () => {
        navigate('/register-sale'); // Redirige a la ruta /register-sale
    };

    return (
        <Layout> {/* Layout engloba el contenido principal de la página */}
            <div className="dashboard">
                <h2>Objetivo de ventas</h2>
                {/* Componente del medidor de ventas */}
                <div className="gauge">
                    <div className="needle"></div>
                </div>
                
                {/* Sección de botones para acciones */}
                <div className="buttons-section">
                    {/* Botón para registrar una compra o gasto */}
                    {/* Se añade el evento onClick que llama a handleRegisterPurchase */}
                    <div className="dashboard-button" onClick={handleRegisterPurchase}>
                        <i className="fas fa-wallet"></i> {/* Icono de Font Awesome */}
                        <p>Registrar una compra o gasto</p>
                    </div>
                    
                    {/* Botón para registrar una venta */}
                    {/* Se añade el evento onClick que llama a handleRegisterSale */}
                    <div className="dashboard-button" onClick={handleRegisterSale}>
                        <i className="fas fa-cash-register"></i> {/* Icono de Font Awesome */}
                        <p>Registrar una venta</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;