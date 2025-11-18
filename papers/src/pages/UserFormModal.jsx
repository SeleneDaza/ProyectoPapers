import React, { useState, useEffect } from 'react';

import '../components/UserFormModal.css';

// Estado inicial con nombres de campo de React (más fáciles de manejar)
const reactInitialState = {
  identificacion: '',
  tipoPersona: 'Persona natural',
  tipoIdentificacion: 'Cédula de ciudadanía',
  nombres: '',
  apellidos: '',
  ciudad: '',
  direccion: '',
  nombresContacto: '',
  apellidosContacto: '',
  email: '',
  telefono: '',
  username: '',
  password: '',
  active: true,
  // Roles como checkboxes
  rolCliente: false,
  rolProveedor: false,
  rolEmpleado: false
};

function UserFormModal({ user, onClose, onSave, defaultRole }) {
  // 'user' que recibimos es un UserDTO de Java
  // 'formData' es el estado interno del formulario de React
  const [formData, setFormData] = useState(reactInitialState);
  const isEditing = Boolean(user);

  useEffect(() => {
    if (isEditing) {
      // Si editamos, convertimos el DTO de Java al estado de React
      setFormData({
        identificacion: user.identificacion || '',
        tipoPersona: user.tipoPersona || 'Persona natural',
        tipoIdentificacion: user.tipoIdentificacion || 'Cédula de ciudadanía',
        nombres: user.nombres || '',
        apellidos: user.apellidos || '',
        ciudad: user.ciudad || '',
        direccion: user.direccion || '',
        nombresContacto: user.nombresContacto || '',
        apellidosContacto: user.apellidosContacto || '',
        email: user.email || '',
        telefono: user.telefono || '',
        username: user.username || '',
        password: '', // Nunca precargamos la contraseña
        active: user.active,
        // Convertimos el Set<String> a checkboxes
        rolCliente: user.roles.includes('CLIENTE'),
        rolProveedor: user.roles.includes('PROVEEDOR'),
        rolEmpleado: user.roles.includes('EMPLEADO'),
      });
    } else {
      // Si creamos, seteamos el rol por defecto de la pestaña
      setFormData({
        ...reactInitialState,
        rolCliente: defaultRole === 'clientes',
        rolProveedor: defaultRole === 'proveedores',
        rolEmpleado: defaultRole === 'empleados',
      });
    }
  }, [user, isEditing, defaultRole]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  // En UserFormModal.jsx, dentro de handleSubmit:

const handleSubmit = (e) => {
  e.preventDefault();
  
  const rolesDTO = new Set();
  if (formData.rolCliente) rolesDTO.add('CLIENTE');
  if (formData.rolProveedor) rolesDTO.add('PROVEEDOR');
  if (formData.rolEmpleado) rolesDTO.add('EMPLEADO'); // Asumo que "EMPLEADO" puede tener username/password

  const userDTO_to_save = {
    identificacion: formData.identificacion,
    tipoPersona: formData.tipoPersona,
    tipoIdentificacion: formData.tipoIdentificacion,
    nombres: formData.nombres,
    apellidos: formData.apellidos,
    ciudad: formData.ciudad,
    direccion: formData.direccion,
    // Siempre enviar nombresContacto y apellidosContacto si es proveedor
    nombresContacto: formData.nombresContacto, 
    apellidosContacto: formData.apellidosContacto, 
    email: formData.email,
    telefono: formData.telefono,
    active: formData.active,
    roles: Array.from(rolesDTO)
  };

  // Lógica para username/password:
  // Solo incluye username y password si tiene el rol de Empleado (o Administrador si lo tuvieras)
  if (formData.rolEmpleado) { // Si tienes rol Administrador, añádelo aquí también: || formData.rolAdministrador
      userDTO_to_save.username = formData.username;
      userDTO_to_save.password = formData.password;
  } else {
      // Asegúrate de que no se envían si no tienen rol de login
      delete userDTO_to_save.username;
      delete userDTO_to_save.password;
  }

  // Si no es proveedor, no enviar campos de contacto (o el backend los ignora/nullea)
  if (!formData.rolProveedor) {
      delete userDTO_to_save.nombresContacto;
      delete userDTO_to_save.apellidosContacto;
  }

  onSave(userDTO_to_save);
};

  // --- RENDERIZADO (Usando los 'name' del estado de React) ---
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</h2>
        
        <form onSubmit={handleSubmit} className="user-form">
          <h4>Datos básicos</h4>
          <div className="form-row">
             <div className="form-group">
              <label>* Identificación</label>
              <input type="text" name="identificacion" value={formData.identificacion} onChange={handleChange} required disabled={isEditing} />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select name="tipoPersona" value={formData.tipoPersona} onChange={handleChange}>
                <option>Persona natural</option>
                <option>Persona jurídica</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tipo de identificación</label>
              <select name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleChange}>
                <option>Cédula de ciudadanía</option>
                <option>Cédula de extranjería</option>
                <option>NIT</option>
                <option>Pasaporte</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>* Nombres</label>
              <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>* Apellidos</label>
              <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Ciudad</label>
              <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
            </div>
          </div>

          <h4>Datos de Contacto (Opcional)</h4>
           <div className="form-row">
            <div className="form-group">
              <label>Nombres Contacto</label>
              <input type="text" name="nombresContacto" value={formData.nombresContacto} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Apellidos Contacto</label>
              <input type="text" name="apellidosContacto" value={formData.apellidosContacto} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
            </div>
          </div>

          <h4>Credenciales (Para Empleados/Admin)</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="form-group">
  <label>Password</label>
  <input
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange} // <-- ¡AÑADIR ESTO!
    placeholder={isEditing ? 'Dejar vacío para no cambiar' : ''}
  />
</div>
          </div>

          <h4>Rol y Estado</h4>
          <div className="checkbox-group-row">
            <label>
              <input type="checkbox" name="rolCliente" checked={formData.rolCliente} onChange={handleChange} /> Cliente
            </label>
            <label>
              <input type="checkbox" name="rolProveedor" checked={formData.rolProveedor} onChange={handleChange} /> Proveedor
            </label>
            <label>
              <input type="checkbox" name="rolEmpleado" checked={formData.rolEmpleado} onChange={handleChange} /> Empleado
            </label>
            <label>
              <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} /> Activo
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-save">{isEditing ? 'Guardar Cambios' : 'Crear Usuario'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserFormModal;