// employeeData.js

export const employeeProfileData = {
  // Datos del Encabezado
  name: "Juan Carlos Gómez Ayala",
  active: true, // Estado del interruptor (toggle)
  role: "Empleado", // El rol marcado en el checkbox (simulado)
  
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