import React from "react";
import { useNavigate } from 'react-router-dom'; 
import "../components/Dashboard.css";
import Layout from "./Layout.jsx"; 

function Dashboard() {
    const navigate = useNavigate(); 

    const handleRegisterPurchase = () => {
        navigate('/register-purchase'); 
    };

    const handleRegisterSale = () => {
        navigate('/register-sale'); 
    };

    return (
        <Layout> 
            <div className="dashboard">
                <h2>Objetivo de ventas mensual</h2>
                <div className="gauge-div">
                    <h1 className="invisible">.......</h1>
                    <h1>$0</h1>
                    <div className="gauge">
                        <div className="needle"></div>
                    </div>
                    <h1>$1'500.00</h1>
                </div>
                
                <div className="buttons-section">
                    <div className="dashboard-button" onClick={handleRegisterPurchase}>
                        <i className="fas fa-wallet"></i>
                        <p>Registrar una compra o gasto</p>
                    </div>
                    <div className="dashboard-button" onClick={handleRegisterSale}>
                        <i className="fas fa-cash-register"></i> 
                        <p>Registrar una venta</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;