// En /hooks/useProducts.js
import { useState, useEffect, useCallback } from 'react'; // Importa useCallback
import api from './api.js';

const API_URL = '/productos';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Usamos useCallback para "memorizar" la función de carga
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    } finally {
      setLoading(false);
    }
  }, []); // El array vacío significa que esta función nunca cambia

  // 2. useEffect la llama la primera vez
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 3. Devuelve la función para que otros componentes puedan llamarla
  return { products, loading, refreshProducts: fetchProducts };
}