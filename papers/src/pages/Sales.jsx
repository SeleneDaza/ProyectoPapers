import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar.jsx";
import Header from "./Header.jsx";
import ClientInfo from "./ClientsInfo.jsx";
import SalesInfo from "./SalesInfo.jsx";
import "../components/Clients.css";
import { useListUsers } from "../hooks/useListUsers.js";
import { fetchSalesData } from "../hooks/salesData.js";
import Layout from "./Layout.jsx";

function Sales() {

  //REVISAR ESTO, SE SUPONE ES PARA EL FILTRO DE BUSQUEDA PERO DEPENDE DEL BACKEND
  const [activeTab, setActiveTab] = useState("clientes");
  const { users: clients, loading, error } = useListUsers("CLIENTE");
  const [sales, setSales] = useState(null);
  const [clientSearch, setClientSearch] = useState("");


  useEffect(() => {
    fetchSalesData().then((data) => setSales(data));
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
            className={`tab-btn ${activeTab === "documentos" ? "active" : ""}`}
            onClick={() => setActiveTab("documentos")}
          >
            Documentos de ventas
          </button>
        </div>
        {activeTab === "clientes" && (
          <>
            <div className="client-header-bar">
             {/* BUSCADOR EXTENDIBLE */}
             <div className="client-name">Nombre del cliente</div>
              <input
                className="autocomplete-input"
                type="text"
                placeholder="Buscar cliente..."
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
              />


            <div className="actions-section">
                <button className="action-btn">Añadir</button>
                <button className="action-btn">Exportar</button>
                <button className="action-btn">Editar</button>
                <button className="action-btn">Eliminar</button>
              </div>
            </div>

            <h2 className="page-title">Información del cliente</h2>

            {loading && (
              <p className="loading">Cargando información del cliente...</p>
            )}

            {error && <p className="loading">Error al cargar clientes.</p>}

            {!loading && !error && clients && clients.length > 0 && (
              <ClientInfo client={clients[0]} />
            )}

            {!loading && !error && clients && clients.length === 0 && (
              <p>No se encontraron clientes.</p>
            )}
          </>
        )}

        {activeTab === "documentos" && (
          <>
            <h2 className="page-title">Filtro de búsqueda</h2>

            {sales ? (
              <SalesInfo sales={sales} />
            ) : (
              <p className="loading">Cargando información de las ventas...</p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Sales;