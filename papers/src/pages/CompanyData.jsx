import React from "react";
import "../components/Company.css";
import { FaEdit } from "react-icons/fa";
import { companyData as data } from "../hooks/companyData.js";
import Layout from "./Layout";

export default function CompanyData() {
  return (
    <Layout>
        <div className="company-container">
        <div className="company-header">
            <h2>Datos de la empresa</h2>
        </div>

        <div className="company-info-card">
            <div className="company-title-row">
            <div className="company-logo">
                <img src={data.logo} alt="logo" />
            </div>

            <h3 className="company-name">{data.companyName}</h3>

            <button className="edit-btn">
                <FaEdit /> Editar
            </button>
            </div>

            <div className="company-info-grid">
            {/* LEFT */}
            <div className="company-col">
                <h4 className="section-title">Datos generales</h4>

                <div className="field">
                <label>Razón social</label>
                <p className="field-value">{data.razonSocial}</p>
                </div>

                <div className="field">
                <label>Tipo de identificación</label>
                <p className="field-value">{data.tipoIdentificacion}</p>
                </div>

                <div className="field">
                <label>Dígito identificación</label>
                <p className="field-value">{data.digito}</p>
                </div>

                <div className="field">
                <label># identificación</label>
                <p className="field-value">{data.identificacion}</p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="company-col">
                <div className="field">
                <label>Nombre comercial</label>
                <p className="field-value">{data.nombreComercial}</p>
                </div>

                <div className="field">
                <label>Correo electrónico</label>
                <p className="field-value link">{data.correo}</p>
                </div>

                <div className="field">
                <label>Dirección</label>
                <p className="field-value">{data.direccion}</p>
                </div>

                <div className="field">
                <label>Ciudad</label>
                <p className="field-value">{data.ciudad}</p>
                </div>
            </div>

            </div>
        </div>
        </div>
    </Layout>
  );
}
