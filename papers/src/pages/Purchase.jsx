import React, { useEffect, useState } from "react";
import SupplierInfo from "./SupplierInfo.jsx";
import PurchaseInfo from "./PurchaseInfo.jsx";
import '../components/Purchase.css';
import { fetchSupplierData } from "../hooks/SupplierData.js";
import {fetchPurchaseData} from "../hooks/PurchaseData.js";
import { useListUsers } from "../hooks/useListUsers.js";
import { useListPurchases } from "../hooks/useListPurchases.js";
import { flattenPurchaseData } from "../utils/purchaseUtils.js";;
import Layout from "./Layout.jsx";

function Purchase() {
  const [activeTab, setActiveTab] = useState("Proovedor");
  const { users: suppliers, loading: suppliersLoading, error: suppliersError } = useListUsers("PROVEEDOR");
  const { purchases, loading: purchasesLoading, error: purchasesError } = useListPurchases();

  const flattenedPurchases = purchases.length > 0 ? flattenPurchaseData(purchases) : [];

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
              {/* ... (Barra de búsqueda y botones) ... */}
              <h2 className="page-title">Información del Proovedor</h2>
              
              {/* --- ⚠️ CAMBIOS (Render Proveedor) --- */}
              {suppliersLoading && (
                <p className="loading">Cargando información del Proveedor...</p>
              )}
              {suppliersError && (
                <p className="loading">Error al cargar proveedores.</p>
              )}
              {!suppliersLoading && !suppliersError && suppliers && suppliers.length > 0 && (
                // Mostramos el primer proveedor (siguiendo el patrón de Sales)
                <SupplierInfo supplier={suppliers[0]} />
              )}
              {/* --- FIN CAMBIOS --- */}
            </>
          )}

          {activeTab === "documentos" && (
            <>
              <h2 className="page-title">Filtro de busqueda</h2>
              
              {/* --- ⚠️ CAMBIOS (Render Documentos) --- */}
              {purchasesLoading ? (
                <p className="loading">Cargando información de las compras...</p>
              ) : purchasesError ? (
                <p className="loading">Error al cargar la información de compras.</p>
              ) : (
                // Pasamos la data APLANADA
                <PurchaseInfo purchase={flattenedPurchases} /> 
              )}
              {/* --- FIN CAMBIOS --- */}
            </>
          )}
        </div>
      </Layout>
  );
}

export default Purchase;
