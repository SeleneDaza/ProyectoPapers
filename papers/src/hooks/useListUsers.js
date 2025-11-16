import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios'; 

/**
 * Hook para listar Usuarios.
 * @param {string | null} roleFilter
 * (ej. "CLIENTE", "PROVEEDOR")
 */
export function useListUsers(roleFilter = null) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      
      let data = response.data;

      if (roleFilter) {
        data = data.filter(t => t.roles.includes(roleFilter));
      }
      
      setUsers(data);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, refreshUsers: fetchUsers };
}