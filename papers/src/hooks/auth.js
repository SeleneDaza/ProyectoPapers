// src/utils/loginLogic.js

export const mockUser = {
  username: "a",
  password: "1",
  name: "Administrador",
};

export function loginUser(username, password) {
  // Simula autenticación
  if (username === mockUser.username && password === mockUser.password) {
    return { success: true, user: mockUser };
  } else {
    return { success: false, message: "Usuario o contraseña incorrectos" };
  }
}
