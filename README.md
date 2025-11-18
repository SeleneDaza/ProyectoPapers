# Papers: Gestión de Papelería (Frontend)

## Descripción del Proyecto

**Papers** es una aplicación web moderna diseñada para **automatizar y optimizar** los procesos clave de una papelería, incluyendo el control de **inventario**, la gestión de **clientes** y el manejo de **proveedores**.

Este repositorio contiene el **código fuente completo del Frontend**, desarrollado con **React** para ofrecer una interfaz de usuario dinámica, intuitiva y responsive, lista para interactuar con la API REST del backend.

## Características Principales

* **CRUD Completo de Inventario:** Gestión total (Crear, Leer, Actualizar, Eliminar) de **Productos y Servicios**.
* **Gestión de Maestros:** Módulos dedicados para la administración eficiente de **Clientes y Proveedores**.
* **Interfaz Moderna:** Implementación de **Material-UI (MUI)** para un diseño limpio, consistente y accesible.
* **Navegación Intuitiva:** Uso de **React Router** para una experiencia de usuario fluida entre las diferentes vistas.
* **Estado Centralizado:** Gestión de la data de la aplicación mediante **Redux Toolkit** para un flujo predecible y escalable.

---

## Stack Tecnológico (Frontend)

El proyecto está construido sobre un stack de desarrollo moderno y robusto. La siguiente tabla detalla los principales componentes y sus propósitos:

| Componente | Tecnología | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | **React** | 18.2+ | Construcción modular de interfaz de usuario. |
| Lenguaje | **JavaScript** (Con tipado estático) | 5.0+ | Desarrollo de lógica y componentes. |
| Enrutamiento | **React Router** | 6.8+ | Navegación entre vistas (ej: `/productos`, `/clientes`). |
| Gestión de Estado | **Redux Toolkit** | 1.9+ | Estado global centralizado y predecible. |
| Peticiones HTTP | **Axios** | 1.3+ | Comunicación asíncrona con el Backend (API REST). |
| UI Framework | **Material-UI (MUI)** | 5.11+ | Componentes de diseño consistentes y listos para producción. |
| Formularios | **React Hook Form** | 7.43+ | Validación y manejo eficiente de formularios. |
| Pruebas | **Jest + React Testing Library** | 29.5+ | Pruebas unitarias y de componentes. |
| Build Tool | **Vite** | 7.2.0+ | Compilación y servidor de desarrollo rápido. |

> **Nota:** La aplicación se comunica con un **Backend** que utiliza **MySQL** como base de datos y está **conteneirizado con Docker**. Asegúrese de tener el backend corriendo antes de iniciar este frontend.

---

## Instalación y Configuración Local

Siga estos pasos para poner en marcha el proyecto en su entorno de desarrollo.

### 1. Requisitos Previos

Asegúrese de tener instalado:

* **Node.js** (Se recomienda la versión LTS)
* **npm** (Gestor de paquetes de Node.js)
* (Opcional, pero recomendado) **Docker** (Necesario para levantar el backend del proyecto).

### 2. Clonar el Repositorio

```bash
# Clona este repositorio (frontend)
git clone [URL_DE_TU_REPOSITORIO]
cd papers-frontend
```

### 3. Instalación de Dependencias

Ejecute el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 4. Configuración de Variables de Entorno

Cree un archivo llamado **`.env.local`** en el directorio raíz del proyecto y defina la URL base de su API de backend.

```env
# .env.local
VITE_API_URL="http://localhost:8080/api/v1"
# Ajuste el puerto (8080 en este ejemplo) según la configuración de su backend con Docker.
```

### 5. Iniciar la Aplicación

Una vez que las dependencias estén instaladas y su **backend esté corriendo**, puede iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en su navegador en `http://localhost:5173/` (o el puerto que indique Vite).

---

## Contribución

Las contribuciones son bienvenidas. Si desea mejorar o añadir nuevas funcionalidades a Papers, por favor siga estos pasos:

1. Haga un **Fork** del repositorio.
2. Cree una nueva rama para su *feature*:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realice sus cambios y haga **Commit**:

   ```bash
   git commit -m "feat: Añadir nueva funcionalidad X"
   ```

4. Haga **Push** a la rama:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Abra un **Pull Request** detallando sus cambios.
