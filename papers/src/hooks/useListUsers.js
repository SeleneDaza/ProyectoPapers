import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

export function useListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);

      const clientes = response.data.filter(t => t.roles.includes('CLIENTE'));
      setUsers(clientes);

    } catch (err) {
      console.error("Error al cargar los usuarios:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, refreshUsers: fetchUsers };
}