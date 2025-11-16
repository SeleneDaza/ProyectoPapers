import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Layout from "./Layout";
import "../components/Profile.css";
import { fetchProfileData } from "../hooks/profile.js";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfileData().then((data) => setProfile(data));
  }, []);

  return (
    <Layout>
      {!profile ? (
        <div className="profile-container">
          <p className="loading">Cargando información del perfil...</p>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <FaUserCircle className="profile-avatar" />
            <div>
              <h3 className="profile-name">{profile.name || "Sin nombre"}</h3>
              <p
                className={`profile-status ${
                  profile.active ? "active" : "inactive"
                }`}
              >
                {profile.active ? "Activo" : "Inactivo"}
              </p>
            </div>
          </div>

          <div className="profile-sections">
            <div className="profile-box">
              <h4>Rol</h4>
              <p>{profile.role || "N/A"}</p>
            </div>

            <div className="profile-box">
              <h4>Datos básicos</h4>
              <p>
                <b>Tipo:</b> {profile.idType || "N/A"}
              </p>
              <p>
                <b>Identificación:</b> {profile.idNumber || "N/A"}
              </p>
            </div>

            <div className="profile-box">
              <h4>Datos de contacto</h4>
              <p>
                <b>Correo:</b> {profile.email || "N/A"}
              </p>
              <p>
                <b>Ciudad:</b> {profile.city || "N/A"}
              </p>
              <p>
                <b>Dirección:</b> {profile.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
