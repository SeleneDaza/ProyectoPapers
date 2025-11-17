import axios from 'axios';

// 1. Apunta al endpoint de autenticación del backend
const API_URL = 'http://localhost:8080/api/auth/login';

/**
 * Llama al backend para autenticar al usuario.
 * @param {string} username - (Identificación del usuario)
 * @param {string} password - (Contraseña en texto plano)
 * @returns {object} - { success: true, user: ... } o { success: false, message: ... }
 */
export async function loginUser(username, password) {
  
  try {
    // 2. Realizar la llamada POST al backend
    const response = await axios.post(API_URL, {
      username: username, // El DTO del backend espera 'username'
      password: password
    });

    // 3. Si la autenticación es exitosa (HTTP 200 OK)
    if (response.data && response.data.authToken) {
      
      // 4. Guardar el token en el Local Storage
      // (Lo necesitaremos más tarde para asegurar las otras llamadas API)
      localStorage.setItem('authToken', response.data.authToken);
      
      // 5. Devolver el formato que LoginPage.jsx espera
      return { success: true, user: { name: response.data.username } };
    
    } else {
      // Caso improbable (200 OK pero sin token)
      return { success: false, message: "Respuesta inválida del servidor" };
    }

  } catch (error) {
    // 6. Manejar errores (401, 403, 500, o red caída)
    console.error("Error de autenticación:", error);

    if (error.code === "ERR_NETWORK") {
        return { success: false, message: "No se pudo conectar al servidor." };
    }
    // El backend (Spring Security) suele devolver 403 (Forbidden) si las credenciales son malas
    return { success: false, message: "Usuario o contraseña incorrectos" };
  }
}
