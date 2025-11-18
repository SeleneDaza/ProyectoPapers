import React, { useState } from 'react';
import { FaPlus, FaFileExport, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import Layout from './Layout.jsx';
import UserList from './UserList.jsx'; 
import UserFormModal from './UserFormModal.jsx';
import api from '../hooks/api.js';
import { useListUsers } from '../hooks/useListUsers.js'; // <-- TU HOOK
import '../components/ProductsCatalog.css'; 
import '../components/UserManagement.css'; 

const API_URL = '/api/usuarios'; // URL para POST, PUT, DELETE

function UserManagement() {
  const [activeTab, setActiveTab] = useState("clientes"); 
  const [selectedUserId, setSelectedUserId] = useState(null); // (Este será la 'identificacion')
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Mapea las pestañas a los roles de tu BD
  const roleMap = {
    clientes: 'CLIENTE',
    proveedores: 'PROVEEDOR',
    empleados: 'EMPLEADO'
  };
  const roleFilter = roleMap[activeTab]; 

  // TU HOOK (él se encarga de filtrar por 'roleFilter')
  const { users, loading, refreshUsers } = useListUsers(roleFilter);

  const handleSelectUser = (identificacion) => {
    setSelectedUserId(prev => (prev === identificacion ? null : identificacion));
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedUserId(null); 
  };

  // --- FUNCIONES CRUD ---
  const handleAdd = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = () => {
    if (!selectedUserId) return;
    const userToEdit = users.find(u => u.identificacion === selectedUserId); 
    setEditingUser(userToEdit);
    setIsFormModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await api.delete(`${API_URL}/${selectedUserId}`); // Borra por 'identificacion'
        await refreshUsers();
        setSelectedUserId(null);
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  // --- FUNCIONES DEL MODAL ---
  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (formData) => { // 'formData' es el DTO de Java
    try {
      if (editingUser) {
        // (U) Update
        await api.put(`${API_URL}/${editingUser.identificacion}`, formData);
      } else {
        // (C) Create
        await api.post(API_URL, formData);
      }
      handleCloseModal();
      await refreshUsers();
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  return (
    <Layout>
      <div className="user-management-page">
        {/* ... (La barra de herramientas y pestañas no cambian) ... */}
        
        {/* Pestañas */}
        <div className="tabs-container-profile">
          <div className={`tab-profile ${activeTab === "clientes" ? "active" : ""}`} onClick={() => handleTabClick("clientes")}>
            Clientes
          </div>
          <div className={`tab-profile ${activeTab === "proveedores" ? "active" : ""}`} onClick={() => handleTabClick("proveedores")}>
            Proveedores
          </div>
          <div className={`tab-profile ${activeTab === "empleados" ? "active" : ""}`} onClick={() => handleTabClick("empleados")}>
            Empleados
          </div>
        </div>

        {/* Contenido (La lista) */}
        <div className="user-list-container">
          {loading ? (
            <p>Cargando usuarios...</p>
          ) : (
            <UserList 
              users={users} 
              onSelect={handleSelectUser}
              selectedUserId={selectedUserId}
            />
          )}
        </div>

        {/* Modal */}
        {isFormModalOpen && (
          <UserFormModal
            user={editingUser}
            onClose={handleCloseModal}
            onSave={handleSave}
            defaultRole={activeTab} 
          />
        )}
      </div>
    </Layout>
  );
}
export default UserManagement;