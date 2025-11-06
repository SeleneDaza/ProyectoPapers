import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar.jsx";
import Header from "./Header.jsx";
import ClientInfo from "./ClientsInfo.jsx";
import "../components/Clients.css";
import { fetchClientData } from "../hooks/clientsLogic.js";
import Layout from "./Layout.jsx";

function Sells() {
  const [activeTab, setActiveTab] = useState("clientes");
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetchClientData().then((data) => setClient(data));
  }, []);

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
            <div className="empty-section">
              <p>Aquí aparecerán los documentos de ventas del cliente.</p>
            </div>
          )}
        </div>
      </Layout>
  );
}

export default Sells;
