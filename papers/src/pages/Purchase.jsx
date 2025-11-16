import React, { useEffect, useState } from "react";
import SupplierInfo from "./SupplierInfo.jsx";
import PurchaseInfo from "./PurchaseInfo.jsx";
import '../components/Purchase.css';
import { fetchSupplierData } from "../hooks/SupplierData.js";
import {fetchPurchaseData} from "../hooks/PurchaseData.js";
import Layout from "./Layout.jsx";

function Purchase() {
  const [activeTab, setActiveTab] = useState("Proovedor");
  const [supplier, setSupplier] = useState(null);
  const [purchase, setpurchase] = useState(null);

  useEffect(() => {
    fetchSupplierData().then((data) => setSupplier(data));
    fetchPurchaseData().then((data)=> setpurchase(data))
  }, []);

  //REVISAR ESTO, SE SUPONE ES PARA EL FILTRO DE BUSQUEDA PERO DEPENDE DEL BACKEND
  const [clientSearch, setClientSearch] = useState("");

  return (
      <Layout>
        <div className="content">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "Proovedor" ? "active" : ""}`}
              onClick={() => setActiveTab("Proovedor")}
            >
              Proovedor
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

          {activeTab === "Proovedor" && (
            <>
            <div className="client-header-bar">
             {/* BUSCADOR EXTENDIBLE */}
             <div className="client-name">Nombre del proveedor</div>
              <input
                className="autocomplete-input"
                type="text"
                placeholder="Buscar proveedor..."
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

              <h2 className="page-title">Información del Proovedor</h2>
              {supplier ? (
                <SupplierInfo supplier={supplier} />
              ) : (
                <p className="loading">Cargando información del Proovedor...</p>
              )}
            </>
          )}

          {activeTab === "documentos" && (
            <>
              <h2 className="page-title">Filtro de busqueda</h2>
              {purchase ? (
                <PurchaseInfo purchase={purchase} />
              ) : (
                <p className="loading">Cargando información de las venta...</p>
              )}
            </>
          )}
        </div>
      </Layout>
  );
}

export default Purchase;
