import { useState, useEffect, useCallback } from 'react';
import api from './api.js';

const API_URL = '/api/usuarios'; // <-- Llama a la ruta principal

export function useListUsers(roleFilter = null) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usamos useCallback para memorizar la función
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Llama a la API (trae TODOS los usuarios)
      const response = await api.get(API_URL);
      
      let data = response.data;

      // 2. Filtra en React (esto es lo que funcionaba)
      if (roleFilter) {
        data = data.filter(t => t.roles.includes(roleFilter));
      }
      
      setUsers(data);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [roleFilter]); // Se re-ejecuta si el filtro de rol cambia

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refreshUsers: fetchUsers };
}