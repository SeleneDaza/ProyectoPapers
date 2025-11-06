// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./pages/SideBar";
import Header from "./pages/Header";
import HomePage from "./pages/Dashboard";
import ClientesPage from "./pages/Sells.jsx";
import ComprasPage from "./pages/Purchase.jsx";
import ProductsCatalog from "./pages/ProductsCatalog";
import UsuariosPage from "./pages/EmployeeProfile.jsx";
import ReportesPage from "./pages/Reports.jsx";
import "./App.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Layout general para las demás páginas */}
        <Route
          path="/*"
          element={
                <div className="content">
                  <Routes>
                    <Route path="/dashboard" element={<HomePage />} />
                    <Route path="/ventas" element={<ClientesPage />} />
                    <Route path="/compras" element={<ComprasPage />} />
                    <Route path="/productos" element={<ProductsCatalog />} />
                    <Route path="/usuarios" element={<UsuariosPage />} />
                    <Route path="/reportes" element={<ReportesPage />} />
                  </Routes>
                </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

