// components/UserManagement.jsx
import React, { useState } from 'react';
import { FaPlus, FaFileExport, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import Layout from './Layout.jsx';
import UserList from './UserList.jsx'; 
import UserFormModal from './UserFormModal.jsx';
import api from '../hooks/api.js';
import { useListUsers } from '../hooks/useListUsers.js'; 
// import '../components/ProductsCatalog.css'; // <--- YA NO NECESITAS ESTE AQUÍ
import '../components/UserManagement.css'; // 💡 ¡Importa el nuevo CSS!

const API_URL = '/usuarios';

function UserManagement() {
  const [activeTab, setActiveTab] = useState("clientes"); 
  const [selectedUserId, setSelectedUserId] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const roleMap = {
    clientes: 'CLIENTE',
    proveedores: 'PROVEEDOR',
    empleados: 'EMPLEADO'
  };
  const roleFilter = roleMap[activeTab]; 

  const { users, loading, refreshUsers } = useListUsers(roleFilter);

  const handleSelectUser = (identificacion) => {
    setSelectedUserId(prev => (prev === identificacion ? null : identificacion));
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedUserId(null); 
  };

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
        await api.delete(`${API_URL}/${selectedUserId}`);
        await refreshUsers();
        setSelectedUserId(null);
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsFormModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (userData) => { // userData es el userDTO_to_save del modal
  try {
    if (editingUser) { 
      await api.put(`/usuarios/${userData.identificacion}`, userData); 
      console.log('Usuario actualizado con éxito');
    } else {
      await api.post('/usuarios', userData);
      console.log('Usuario creado con éxito');
    }
    
    // ✅ CAMBIO CLAVE AQUÍ: Llama a refreshUsers() en lugar de fetchUsers()
    refreshUsers();       // 1. Recargar la lista de usuarios para ver los cambios
    handleCloseModal(); // 2. Cerrar el modal

  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    if (error.response && error.response.data && error.response.data.message) {
       alert(`Error: ${error.response.data.message}`); 
    } else {
       alert('Error al guardar el usuario. Consulta la consola para más detalles.');
    }
    if (error.response && error.response.status === 403) {
        handleCloseModal(); 
    }
  }
};
  return (
    <Layout>
      <div className="user-management-page"> {/* 💡 Aplica la clase del contenedor principal */}
        
        {/* --- BARRA DE HERRAMIENTAS (Adaptada con las clases de Productos) --- */}
        <div className="toolbar-container-inline">
          
          {/* Input de Búsqueda (con las clases de Productos) */}
          <div className="search-input-group-inline">
            <input type="text" placeholder="Buscar usuario..." className="search-input-compact"/>
            <FaSearch className="search-icon-compact" />
          </div>

          {/* Botones de Acción (con las clases de Productos) */}
          <div className="action-buttons-group-inline">
            <button className="toolbar-btn inline-btn add-btn-inline" onClick={handleAdd}>
              <FaPlus /> Añadir
            </button>
            <button className="toolbar-btn inline-btn export-btn-inline">
              <FaFileExport /> Exportar
            </button>
            <button 
              className="toolbar-btn inline-btn edit-btn-inline" 
              onClick={handleEdit}
              disabled={!selectedUserId} 
            >
              <FaEdit /> Editar
            </button>
            <button 
              className="toolbar-btn inline-btn delete-btn-inline" 
              onClick={handleDelete}
              disabled={!selectedUserId} 
            >
              <FaTrash /> Eliminar
            </button>
          </div>
        </div>
        {/* --- FIN DE LA BARRA DE HERRAMIENTAS --- */}


        {/* Pestañas (Tu código actual, que ya usa "tabs-container-profile" y "tab-profile") */}
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

        {/* Contenido (La lista) (Tu código actual, asegúrate de que UserList tenga estilos para sus elementos) */}
        <div className="user-list-container"> {/* 💡 Añade una clase para el contenedor de la lista */}
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

        {/* Modal (Tu código actual) */}
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