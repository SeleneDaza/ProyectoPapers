// notificationsLogic.js

export async function fetchNotifications() {
  try {
    const response = await fetch("http://localhost:3000/api/notifications");
    if (!response.ok) throw new Error("Error al obtener notificaciones");
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // en caso de error, devolver vacío
  }
}
