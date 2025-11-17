import { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Apunta al endpoint de compras del backend
const API_URL = 'http://localhost:8080/api/compras';

export function useListPurchases() {
  // 2. Nombres de variables cambiados a 'purchases'
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(API_URL);
        // 3. Guarda la lista de PurchaseDTO
        setPurchases(response.data);
      } catch (err) {
        console.error('Error al cargar la lista de compras:', err);
        setError("Error al cargar la lista de compras. (¿API caída?)");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  return { purchases, loading, error };
}