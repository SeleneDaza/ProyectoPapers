document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("products-grid");

  // 🔹 Simulación temporal (reemplazará a fetch("http://localhost:8080/api/products"))
  const productos = [
    { nombre: "Cuaderno Norma", imagen: "../assets/products/cuaderno.jpg" },
    { nombre: "Lápiz mirado", imagen: "../assets/products/lapiz.jpg" },
    { nombre: "Resaltador Sharpie", imagen: "../assets/products/resaltador.jpg" },
    { nombre: "Portaminas", imagen: "../assets/products/portaminas.jpg" },
    { nombre: "Tinta Epson", imagen: "../assets/products/tinta.jpg" }
  ];

  grid.innerHTML = productos.map(p => `
    <div class="product-card">
      <img src="${p.imagen}" alt="${p.nombre}">
      <p>${p.nombre}</p>
    </div>
  `).join("");
});
