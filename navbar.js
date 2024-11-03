const productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: 1, nombre: "Invictus Legend 100 ml - Paco Rabanne", precio: 156000, imagen: "assests/perfumes/invictus-legend.png", categoria: "hombre", volumen: "100ml", descuento: 40 },
    { id: 2, nombre: "Invictus Platinum edp 100 ml - Paco Rabanne", precio: 120000, imagen: "assests/perfumes/invictus-platinum.png", categoria: "hombre", volumen: "100ml", descuento: 30 },
    { id: 3, nombre: "One Million Parfum 100 ml - Paco Rabanne", precio: 93000, imagen: "assests/perfumes/one-million-parfum.png", categoria: "hombre", volumen: "100ml", descuento: 20 },
    { id: 4, nombre: "Emporio Armani Stronger With You 100ml - Giorgio Armani", precio: 125000, imagen: "assests/perfumes/stronger.png", categoria: "hombre", volumen: "100ml", descuento: 10 },
    { id: 5, nombre: "La Belle Le Parfum Intense 100ml - Jean Paul Gaultier", precio: 135000, imagen: "assests/perfumes/la-belle.png", categoria: "mujer", volumen: "100ml" },
    { id: 6, nombre: "One Million Elixir 200ml - Paco Rabanne", precio: 195000, imagen: "assests/perfumes/one-elixir.png", categoria: "hombre", volumen: "200ml" },
    { id: 7, nombre: "Sauvage 100ml - Dior", precio: 135000, imagen: "assests/perfumes/sauvage.png", categoria: "hombre", volumen: "100ml", descuento: 30 },
    { id: 8, nombre: "La Vie Est Belle Soleil Cristal 100ml - Lancome", precio: 112000, imagen: "assests/perfumes/lavie-solei.png", categoria: "mujer", volumen: "100ml", descuento: 20 },
    { id: 9, nombre: "Eros Pour Femme edp 100ml - Versace", precio: 125000, imagen: "assests/perfumes/eros-pour-femme.png", categoria: "mujer", volumen: "100ml", descuento: 10 },
    { id: 10, nombre: "La Male Le Parfum 200ml - Jean Paul Gaultier", precio: 111000, imagen: "assests/perfumes/la-male.png", categoria: "hombre", volumen: "200ml" },
    { id: 11, nombre: "Versace Eros Eau De Parfum", precio: 128000, imagen: "assests/perfumes/eros-edp.png", categoria: "hombre", volumen: "100ml" },
    { id: 12, nombre: "Le Beau edt 200ml - Jean Paul Gaultier", precio: 135000, imagen: "assests/perfumes/le-beau.png", categoria: "hombre", volumen: "200ml" },
    { id: 13, nombre: "Good Girl Légere 200ml - Carolina Herrera", precio: 136000, imagen: "assests/perfumes/good-girl-1.png", categoria: "mujer", volumen: "200ml", descuento: 10 },
    { id: 14, nombre: "Chance Eau Tendré 200ml - Chanel", precio: 135000, imagen: "assests/perfumes/chanel-chance.png", categoria: "mujer", volumen: "200ml" },
    { id: 15, nombre: "Lady Million Fabulous 100ml - Paco Rabanne", precio: 98000, imagen: "assests/perfumes/lady-fabulous.png", categoria: "mujer", volumen: "100ml", descuento: 40 },
    { id: 16, nombre: "Olympéa Solar 100ml - Paco Rabanne", precio: 125000, imagen: "assests/perfumes/olympea.png", categoria: "mujer", volumen: "100ml", descuento: 30 },
    { id: 17, nombre: "Miss Dior Le Parfum 200ml - Dior", precio: 105000, imagen: "assests/perfumes/miss-dior.png", categoria: "mujer", volumen: "200ml" },
    { id: 18, nombre: "The One Gold Limited Edition 100ml - Dolce Gabbana", precio: 105000, imagen: "assests/perfumes/dolce.png", categoria: "mujer", volumen: "100ml", descuento: 20 },
];

function actualizarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Llamar a esta función después de añadir o eliminar productos para mantener sincronización
actualizarLocalStorage();

// Guardar productos en LocalStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("productos")) {
        localStorage.setItem("productos", JSON.stringify(productos));
    }
});

document.getElementById("btn-buscar").addEventListener("click", () => {
    window.location.href = "error404.html"; // Redirige a la página de error
});

document.addEventListener("DOMContentLoaded", () => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"; // Verificar como cadena

    // Selecciona los botones de gestión y cierre de sesión
    const gestionProductosBtn = document.getElementById("gestion-productos-btn");
    const cerrarSesionBtn = document.getElementById("cerrar-sesion-btn");

    // Mostrar u ocultar botones según el estado de la sesión
    if (isAdminLoggedIn) {
        gestionProductosBtn.style.display = "inline-block"; // Muestra gestión de productos
        cerrarSesionBtn.style.display = "inline-block"; // Muestra cerrar sesión
    } else {
        gestionProductosBtn.style.display = "none";
        cerrarSesionBtn.style.display = "none";
    }

    // Cerrar sesión
    cerrarSesionBtn.addEventListener("click", () => {
        localStorage.removeItem("isAdminLoggedIn"); // Elimina el estado de sesión
        alert("Sesión cerrada");
        window.location.href = "index.html"; // Redirige al inicio
    });
});


// Cargar productos de localStorage al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Función para renderizar productos en el navbar u otras secciones
    const renderizarProductos = () => {
        const contenedorProductos = document.getElementById("productos-container");
        contenedorProductos.innerHTML = ""; // Limpiar contenido previo

        productos.forEach((producto) => {
            const productoElem = document.createElement("div");
            productoElem.classList.add("producto-item");
            productoElem.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                ${producto.descuento ? `<p>Descuento: ${producto.descuento}%</p>` : ""}
                <button onclick="agregarAlCarrito(${producto.id})">Comprar</button>
            `;
            contenedorProductos.appendChild(productoElem);
        });
    };

    // Llamar a la función de renderizado
    renderizarProductos();
});






