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
                <button className="help-btn"><FaQuestionCircle /> Ayuda</button>
        <FaBell className="header-icon" />
        <FaCog className="header-icon" />
        <div className="user-info">
          <FaUser className="header-icon" /> 

        </div>
      </div>
    </header>
  );
}

export default Header;
