import React from "react";
import "../components/Dashboard.css";
import { FaBell, FaCog, FaQuestionCircle, FaUser } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Buscar" />
      </div>

      <div className="header-right">
        <FaBell className="header-icon" />
        <FaCog className="header-icon" />
        <button className="help-btn"><FaQuestionCircle /> Ayuda</button>
        <div className="user-info">
          <FaUser /> Adriana Fonseca
        </div>
      </div>
    </header>
  );
}

export default Header;
