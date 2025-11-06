import React, { useState } from "react";
import "../components/LoginPage.css";
import logo from "../assets/logo.png";
import storefront from "../assets/storefront.png";
import { loginUser } from "../hooks/auth.js"; // 👈 importamos la lógica
import { useNavigate } from "react-router-dom"; // 👈 importa para redirigir

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 hook de navegación

  const handleLogin = (e) => {
    e.preventDefault();
    const result = loginUser(username, password);

    if (result.success) {
      setError("");
      navigate("/dashboard"); // 👈 redirige al componente HomePage.jsx
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img
          src={storefront}
          alt="Paper's Papelería"
          className="storefront-img"
        />
      </div>

      <div className="right-side">
        <form className="login-box" onSubmit={handleLogin}>
          <img src={logo} alt="Paper's Logo" className="logo" />

          <label className="field-label">Usuario:</label>
          <input
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="field-label">Contraseña:</label>
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Ingresar</button>

          <a href="#" className="forgot-password">
            ¿Olvidó su contraseña?
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
