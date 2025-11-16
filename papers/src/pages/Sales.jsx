import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar.jsx";
import Header from "./Header.jsx";
import ClientInfo from "./ClientsInfo.jsx";
import SalesInfo from "./SalesInfo.jsx";
import "../components/Clients.css";
import { useListUsers } from "../hooks/useListUsers.js";
import {fetchSalesData} from "../hooks/salesData.js";
import Layout from "./Layout.jsx";

function Sales() {
  const [activeTab, setActiveTab] = useState("clientes");
  const { users: clients, loading, error } = useListUsers("CLIENTE");
  const [sales, setSales] = useState(null);

  return (
      <Layout>
        <div className="content">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "clientes" ? "active" : ""}`}
              onClick={() => setActiveTab("clientes")}
            >
              Clientes
            </button>
            <button
              className={`tab-btn ${
                activeTab === "documentos" ? "active" : ""
              }`}
              onClick={() => setActiveTab("documentos")}
            >
              Documentos de ventas
            </button>
          </div>

          {activeTab === "clientes" && (
            <>
              <h2 className="page-title">Información del cliente</h2>
              {client ? (
                <ClientInfo client={client} />
              ) : (
                <p className="loading">Cargando información del cliente...</p>
              )}
            </>
          )}

          {activeTab === "documentos" && (
            <>
              <h2 className="page-title">Filtro de busqueda</h2>
              {sales ? (
                <SalesInfo sales={sales} />
              ) : (
                <p className="loading">Cargando información de las venta...</p>
              )}
            </>
          )}
        </div>
      </Layout>
  );
}

export default Sales;
