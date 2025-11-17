import { useState, useEffect } from 'react';
import api from './api.js';

const API_URL = '/ventas';

export function useListSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get(API_URL);
        setSales(response.data);
      } catch (err) {
        console.error('Error al cargar la lista de ventas:', err);
        setError("Error al cargar la lista de ventas. (¿API caída?)");
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  return { sales, loading, error };
}