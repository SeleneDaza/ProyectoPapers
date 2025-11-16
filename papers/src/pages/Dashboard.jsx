import React from "react";
import Sidebar from "./SideBar.jsx";
import "../components/Dashboard.css";
import Header from "./Header.jsx";
import Layout from "./Layout.jsx";

function Dashboard() {
  return (
      <Layout>
        <div className="dashboard">
          <h2>Objetivo de ventas</h2>
          <div className="gauge">
            <div className="needle"></div>
          </div>
          <div className="buttons-section">
            <div className="dashboard-button">
              <i className="fas fa-wallet"></i>
              <p>Registrar una compra o gasto</p>
            </div>
            <div className="dashboard-button">
              <i className="fas fa-cash-register"></i>
              <p>Registrar una venta</p>
            </div>
          </div>
        </div>
      </Layout>
  );
}

export default Dashboard;
