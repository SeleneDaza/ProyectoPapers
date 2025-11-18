import { useState, useEffect, useCallback } from 'react';
import api from './api.js';

// No necesitamos la URL principal si vamos a usar la específica de rol
// const API_URL = '/api/usuarios'; 

export function useListUsers(roleFilter = null) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (roleFilter) {
        // 💡 CAMBIO CRÍTICO: Llamar directamente al endpoint del backend que filtra por rol
        response = await api.get(`usuarios/rol/${roleFilter}`); 
      } else {
        // Fallback: Si no hay filtro de rol, puedes decidir si listar todos o no hacer nada
        // Para este caso, si no hay rol, podemos optar por no cargar nada
        setUsers([]); 
        setLoading(false);
        return;
        // O si quieres listar todos los usuarios (excluyendo ADMIN) si no hay filtro de rol:
        // response = await api.get('/api/usuarios'); 
      }
      
      // Si el backend no devuelve contenido (204 No Content), data puede ser null
      // Tu backend devuelve 204 si la lista está vacía, por eso la imagen no muestra nada.
      // Si recibes 204 (no content), `response.data` será `undefined`.
      setUsers(response.data || []); 

    } catch (err) {
      // Manejo específico para 404/no content si el backend no lo maneja como 204
      if (err.response && err.response.status === 404) {
          setUsers([]); // No se encontraron usuarios para ese rol
      } else {
          setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [roleFilter]); // Se re-ejecuta si el filtro de rol cambia

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refreshUsers: fetchUsers };
} 