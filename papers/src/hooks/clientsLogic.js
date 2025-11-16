// Simulación temporal del backend
export function fetchClientData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Juan Carlos Gómez Ayala",
        active: true,
        role: "Cliente",
        email: "juangomez09@gmail.com",
        idType: "Cédula de ciudadanía",
        idNumber: "7492284",
        city: "Tunja",
        address: "Carrera 4ª #40-48",
      });
    }, 1000);
  });
}
