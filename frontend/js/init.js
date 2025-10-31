document.addEventListener('DOMContentLoaded', () => {
    // Solo si estamos en la página del dashboard
    if (document.getElementById('sales-gauge')) {
        animateSalesGauge();
    }
});

/**
 * Función para animar el medidor de objetivo de ventas.
 */
function animateSalesGauge() {
    const needle = document.querySelector('.gauge-needle');
    
    // 1. Definir el valor de ventas real (mockeado por ahora)
    const MAX_GOAL = 1500000;
    const CURRENT_SALES = 950000; // Ejemplo: 950.000 (aprox. 63% del objetivo)

    // 2. Calcular el porcentaje y el ángulo de rotación
    const percentage = Math.min(1, CURRENT_SALES / MAX_GOAL);
    
    // El medidor va de 0 grados (0%) a 180 grados (100%).
    // Para replicar el diseño de la imagen, el medidor parece ir de -45 grados a +45 grados, 
    // cubriendo 90 grados. Si asumimos un semicírculo completo:
    // Ángulo total del semicírculo = 180 grados.
    const ROTATION_RANGE = 180; 
    
    // Para replicar la imagen que parece estar en un rango de 180 grados.
    // La rotación inicial (0%) es -90deg. La rotación final (100%) es +90deg.
    // El ángulo de rotación es (porcentaje * 180) - 90 grados.
    const rotationAngle = (percentage * ROTATION_RANGE) - 90;

    console.log(`Ventas actuales: ${CURRENT_SALES}. Porcentaje: ${Math.round(percentage * 100)}%. Ángulo: ${rotationAngle.toFixed(2)}deg.`);

    // 3. Aplicar la rotación a la aguja con animación CSS
    needle.style.transform = `translateX(-50%) rotate(${rotationAngle}deg)`;
}