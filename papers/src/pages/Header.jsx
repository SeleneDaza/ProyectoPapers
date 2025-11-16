import React from "react";
import "../components/Header.css";
import { FaBell, FaCog, FaQuestionCircle, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Buscar" />
      </div>

      <div className="header-right">
        <button className="help-btn"><FaQuestionCircle /> Ayuda</button>
        <button className="extra-button"><FaBell className="header-icon" /></button>
        <button className="extra-button"><FaCog className="header-icon" /></button>
        <button className="perfil-button">
        <div className="user-info" onClick={() => navigate("/perfil")}>
          <FaUser className="header-icon" /> 
        </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
