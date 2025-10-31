document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.querySelector(".page");
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item");

  // Asocia cada botón con su HTML correspondiente
 const rutas = {
    "Inicio": "init.html",
    "Ventas": "sales.html",
    "Compras": "shop.html",
    "Productos y servicios": "products.html",
    "Usuarios": "users.html",
    "Reportes": "reports.html"
 };


  // Función para cargar el contenido dentro del div.page
  async function cargarPagina(ruta) {
    try {
      const res = await fetch(ruta);
      if (!res.ok) throw new Error("Error al cargar el contenido.");
      const html = await res.text();
      contentDiv.innerHTML = html;
    } catch (err) {
      contentDiv.innerHTML = `<p style="color:red; text-align:center; margin-top: 50px;">Error al cargar el contenido.</p>`;
      console.error(err);
    }
  }

  // Cargar la página de inicio al entrar
  cargarPagina(rutas["Inicio"]);

  // Asignar eventos de clic
  navItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();

      // Cambiar estilo activo
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Buscar la ruta por el texto
      const texto = item.textContent.trim();
      const nuevaRuta = rutas[texto];

      // Cargar el contenido
      if (nuevaRuta) cargarPagina(nuevaRuta);
    });
  });
});
