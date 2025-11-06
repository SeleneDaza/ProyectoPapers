// hooks/employeeLogic.js

// **Nota:** En una aplicación real, estos datos se importarían del archivo employeeData.js
// o se definirían aquí si esta fuera la única fuente.

const employeeProfileData = {
  // Datos del Encabezado
  name: "Juan Carlos Gómez Ayala",
  active: true,
  role: "Empleado",
  
  // Datos de la sección "Datos básicos"
  basic: {
    type: "Persona natural",
    idType: "Cédula de ciudadanía",
    idNumber: "7492284",
    names: "Juan Carlos",
    surnames: "Gómez Ayala",
    city: "Tunja",
    address: "Carrera 4ª #40-48",
  },
  
  // Datos de la sección "Datos para facturación y envío"
  billing: {
    contactNames: "Juan Carlos",
    contactSurnames: "Gómez Ayala",
    email: "jc.gomez@empresa.com",
    phone: "310 123 4567",
  },

  // Roles/Flags
  isClient: false,
  isProvider: false,
  isEmployee: true,
};

/**
 * Simula la obtención de los datos del perfil de un empleado desde el backend.
 * @returns {Promise<Object>} Promesa que resuelve con los datos del perfil.
 */
export const fetchEmployeeData = () => {
  console.log("Simulando fetch de datos del empleado...");
  return new Promise(resolve => {
    // Simula un retraso de red de 700ms
    setTimeout(() => {
      resolve(employeeProfileData); 
      console.log("Datos del empleado cargados.");
    }, 700);
  });
};