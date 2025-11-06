import React from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import "../components/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
