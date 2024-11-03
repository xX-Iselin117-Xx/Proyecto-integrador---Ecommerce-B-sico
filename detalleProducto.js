// Evento para ejecutar cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    const producto = JSON.parse(localStorage.getItem("productoSeleccionado"));

    if (producto) {
        document.getElementById("detalle-imagen").src = producto.imagen;
        document.getElementById("detalle-nombre").textContent = producto.nombre;
        document.getElementById("detalle-precio").textContent = `Precio: $ ${producto.precio.toLocaleString()}`;
        document.getElementById("detalle-volumen").textContent = producto.volumen;
        document.getElementById("stock-disponible").textContent = "(10 disponibles)";
    } else {
        console.error("Producto no encontrado");
    }

    let cantidad = 1;

    // Incrementar la cantidad del producto
    document.getElementById("incrementar").addEventListener("click", () => {
        cantidad++;
        document.getElementById("cantidad").textContent = cantidad;
    });

    // Decrementar la cantidad del producto, sin bajar de 1
    document.getElementById("decrementar").addEventListener("click", () => {
        if (cantidad > 1) {
            cantidad--;
            document.getElementById("cantidad").textContent = cantidad;
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productoId = parseInt(params.get("id")); // Obtener ID del producto

    const productos = JSON.parse(localStorage.getItem("productos")); // Cargar productos

    const producto = productos.find(p => p.id === productoId); // Buscar producto por ID

    if (producto) {
        document.getElementById("detalle-imagen").src = producto.imagen;
        document.getElementById("detalle-nombre").textContent = producto.nombre;
        document.getElementById("detalle-precio").textContent = `Precio: $ ${producto.precio.toLocaleString()}`;
        document.getElementById("detalle-volumen").textContent = producto.volumen;
        document.getElementById("stock-disponible").textContent = "(10 disponibles)";
    } else {
        console.error("Producto no encontrado.");
    }
});
