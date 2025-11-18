export function fetchProfileData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Adriana Fonseca",
        active: true,
        role: "ADMINISTRADOR",
        email: "juangomez09@gmail.com",
        idType: "Cédula de ciudadanía",
        idNumber: "40038263",
        city: "Tunja",
        address: "Carrera 4ª #40-48",
      });
    }, 1000);
  });
}
