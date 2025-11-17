import { useState, useEffect } from 'react';
import api from './api.js';


// La URL de tu API de Java
const API_URL = '/productos';

/**
 * Este es un Hook personalizado que maneja la lógica
 * para obtener los productos de la API.
 */
export function useProducts() {
  // Estado para guardar la lista de productos
  const [products, setProducts] = useState([]);
  
  // Estado para saber si estamos "cargando"
  const [loading, setLoading] = useState(true);

  // useEffect se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1. Llama a tu API de Java
        const response = await api.get(API_URL);
        // 2. Guarda los datos en el estado
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        // 3. Termina el estado de "cargando"
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El [] asegura que solo se ejecute una vez

  // Devuelve los productos y el estado de carga
  return { products, loading };
}