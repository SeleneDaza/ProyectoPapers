import React, { useState } from "react";
import "../components/Header.css";
import { FaBell, FaCog, FaQuestionCircle, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PopUpManual from "./PopUpManual.jsx";

function Header() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <header className="header">
        <div className="search-bar">
          <input type="text" placeholder="Buscar" />
        </div>

        <div className="header-right">
          <button className="help-btn" onClick={() => setShowPopup(true)}>
            <FaQuestionCircle /> Ayuda
          </button>
          <button className="extra-button" onClick={() => navigate("/notificaciones")}><FaBell className="header-icon" /></button>

          <button className="perfil-button">
            <div className="user-info" onClick={() => navigate("/perfil")}>
              <FaUser className="header-icon" />
            </div>
          </button>
        </div>
      </header>

      <PopUpManual
        show={showPopup}
        onConfirm={() => setShowPopup(false)}
      />
    </>
  );
}

export default Header;