// Lógica de autenticación quemada (hardcoded/mocked) para pruebas iniciales.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // 🌟 CREDENCIALES QUEMADAS PARA PRUEBAS
    const MOCK_USER = 'a@a.com';
    const MOCK_PASS = '1';
    const MOCK_TOKEN = 'mock-jwt-token-12345'; // Token ficticio

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value;
            const password = passwordInput.value;

            // Simulación de la verificación de credenciales
            if (email === MOCK_USER && password === MOCK_PASS) {
                // Éxito: Simular el guardado del token (como si viniera del backend)
                localStorage.setItem('authToken', MOCK_TOKEN);
                
                // Ocultar mensaje de error si estaba visible
                errorMessage.classList.add('hidden');
                
                // Redirigir al dashboard
                window.location.href = 'dashboard.html';

            } else {
                // Error: Mostrar mensaje
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                errorMessage.classList.remove('hidden');
            }
        });
    }

    // 💡 Función de verificación de autenticación (para proteger otras páginas)
    window.checkAuth = function() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            // Si no hay token, redirigir al login
            window.location.href = 'index.html'; 
        }
        // En un proyecto real, aquí se verificaría la validez del token con el backend.
    }
});