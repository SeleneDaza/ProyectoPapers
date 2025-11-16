import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar.jsx";
import Header from "./Header.jsx";
import ClientInfo from "./ClientsInfo.jsx";
import SalesInfo from "./SalesInfo.jsx";
import "../components/Clients.css";
import { useListUsers } from "../hooks/useListUsers.js";
import {fetchSalesData} from "../hooks/salesData.js";
import { useListSales } from "../hooks/useListSales.js";
import { flattenSalesData } from "../hooks/salesUtils.js";
import Layout from "./Layout.jsx";

function Sales() {
  const [activeTab, setActiveTab] = useState("clientes");
  const { users: clients, loading, error } = useListUsers("CLIENTE");
  const { sales, loading: salesLoading, error: salesError } = useListSales();

  const flattenedSales = sales.length > 0 ? flattenSalesData(sales) : [];

  useEffect(() => {
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
              
              {/* Muestra "Cargando..." mientras el hook trabaja */}
              {loading && (
                <p className="loading">Cargando información del cliente...</p>
              )}
              
              {/* Muestra un error si el hook falla */}
              {error && (
                <p className="loading">Error al cargar clientes.</p>
              )}
              
              {/* Si NO está cargando, NO hay error, y SÍ hay clientes... */}
              {!loading && !error && clients && clients.length > 0 && (
                // ...muestra el PRIMER cliente de la lista
                // (Ahora usamos 'clients' (plural) que SÍ existe)
                <ClientInfo client={clients[0]} />
              )}

              {/* Si no hay clientes (lista vacía) */}
               {!loading && !error && clients && clients.length === 0 && (
                <p>No se encontraron clientes.</p>
              )}
            </>
          )}

          {activeTab === "documentos" && (
            <>
              <h2 className="page-title">Filtro de busqueda</h2>
              {/* --- CAMBIO: Usamos las nuevas variables --- */}
              {salesLoading ? (
                <p className="loading">Cargando información de las ventas...</p>
              ) : salesError ? (
                <p className="loading">Error al cargar la información de ventas.</p>
              ) : (
                <SalesInfo sales={flattenedSales} /> 
              )}
            </>
          )}
        </div>
      </Layout>
  );
}

export default Sales;
