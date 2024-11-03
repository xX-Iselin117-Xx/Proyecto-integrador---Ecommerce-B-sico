document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("productos", JSON.stringify(productos));
    renderizarProductos(obtenerProductos());

    // Asignar eventos a los filtros
    document.getElementById("categoria-select").addEventListener("change", aplicarFiltros);
    document.getElementById("volumen-select").addEventListener("change", aplicarFiltros);
});

// Obtener los productos del LocalStorage
function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

// Renderizar productos en el DOM
function renderizarProductos(listaProductos) {
    const contenedorProductos = document.querySelector(".products");
    contenedorProductos.innerHTML = ""; // Limpiar contenedor

    if (listaProductos.length === 0) {
        contenedorProductos.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    listaProductos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("product-card");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="precio-original">Antes: $${(producto.precio / (1 - producto.descuento / 100)).toFixed(0)}</p>
            <p class="precio-descuento">Ahora: $${producto.precio.toLocaleString()}</p>
            <button class="ver-mas" data-id="${producto.id}">Ver más</button>
        `;
        contenedorProductos.appendChild(tarjeta);
    });

    // Asignar eventos "Ver más" después de renderizar
    agregarEventosVerMas();
}

// Función para agregar eventos a los botones "Ver más"
function agregarEventosVerMas() {
    const botonesVerMas = document.querySelectorAll(".ver-mas");

    botonesVerMas.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoId = parseInt(e.target.dataset.id);
            const productoSeleccionado = obtenerProductos().find(p => p.id === productoId);

            if (productoSeleccionado) {
                localStorage.setItem("productoSeleccionado", JSON.stringify(productoSeleccionado));
                window.location.href = `detalleProducto.html?id=${productoId}`;
            } else {
                console.error("Producto no encontrado");
            }
        });
    });
}

// Función para aplicar los filtros
// Aplicar los filtros seleccionados
function aplicarFiltros() {
    const categoria = document.getElementById("categoria-select").value;
    const volumen = document.getElementById("volumen-select").value;
    const descuento = parseInt(document.getElementById("descuento-select").value) || 0;

    let productosFiltrados = obtenerProductos();

    if (categoria !== "all") {
        productosFiltrados = productosFiltrados.filter(p => p.categoria === categoria);
    }
    if (volumen !== "all") {
        productosFiltrados = productosFiltrados.filter(p => p.volumen === volumen);
    }
    if (descuento > 0) {
        productosFiltrados = productosFiltrados.filter(p => p.descuento >= descuento);
    }

    renderizarProductos(productosFiltrados);
}

// Asignar el evento de cambio al filtro de descuento
document.getElementById("descuento-select").addEventListener("change", aplicarFiltros);

document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("productos", JSON.stringify(productos));
    
    // Verificar si hay un filtro de categoría en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = urlParams.get("categoria");

    // Obtener y filtrar productos según la categoría seleccionada
    const productosFiltrados = categoriaSeleccionada 
        ? obtenerProductos().filter(producto => producto.categoria === categoriaSeleccionada)
        : obtenerProductos();

    // Renderizar los productos filtrados o todos si no hay categoría
    renderizarProductos(productosFiltrados);

    // Asignar eventos a los filtros
    document.getElementById("categoria-select").addEventListener("change", aplicarFiltros);
    document.getElementById("volumen-select").addEventListener("change", aplicarFiltros);
});

