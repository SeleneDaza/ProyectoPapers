import React from 'react';
import '../components//UserList.css'; // CSS dedicado para la tabla

function UserList({ users, onSelect, selectedUserId }) {
  
  if (users.length === 0) {
    return <p className="no-users-message">No se encontraron usuarios.</p>;
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
  key={user.identificacion} // <-- Usar 'identificacion' como key
  className={user.identificacion === selectedUserId ? 'selected' : ''} // <-- Comparar con 'identificacion'
  onClick={() => onSelect(user.identificacion)} // <-- Enviar 'identificacion'
>
  <td>{`${user.nombres || ''} ${user.apellidos || ''}`}</td>
  <td>{`${user.tipoIdentificacion || 'N/A'}: ${user.identificacion || ''}`}</td>
  <td>{user.email || 'N/A'}</td>
  <td>{user.telefono || 'N/A'}</td>
  <td>{user.ciudad || 'N/A'}</td>
</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;