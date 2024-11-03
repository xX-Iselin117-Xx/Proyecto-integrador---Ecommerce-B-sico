// Comprobar si el admin ha iniciado sesión
document.addEventListener("DOMContentLoaded", () => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    if (!isAdminLoggedIn) {
        alert("No tienes permiso para acceder a esta página.");
        window.location.href = "login.html"; // Redirige al login
    } else {
        actualizarListaProductos();
    }
});

// Función para cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "index.html";
});

// Función para añadir productos
document.getElementById("addProductForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener datos del producto
    const nombre = document.getElementById("productName").value;
    const precio = parseFloat(document.getElementById("productPrice").value);
    const descuento = parseFloat(document.getElementById("productDiscount").value) || 0;
    const volumen = document.getElementById("productVolume").value;
    const categoria = document.getElementById("productCategory").value;
    const imagen = document.getElementById("productImage").files[0];
    const id = Date.now();  // Generar ID único

    // Crear URL de la imagen para almacenarla temporalmente
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const nuevoProducto = {
        id,
        nombre,
        precio,
        descuento,
        volumen,
        categoria, 
        imagen: URL.createObjectURL(imagen)
    };

    // Añadir nuevo producto y actualizar localStorage
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    actualizarListaProductos();
    document.getElementById("addProductForm").reset();
});

// Función para mostrar la lista de productos
function actualizarListaProductos() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.forEach(producto => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: auto;">
            <p>Nombre: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Descuento: ${producto.descuento}%</p>
            <p>Volumen: ${producto.volumen}</p>
            <p>Categoría: ${producto.categoria}</p>
            <button onclick="editarProducto(${producto.id})">Editar</button>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        productList.appendChild(li);
    });
}

// Función para eliminar productos
function eliminarProducto(id) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos = productos.filter(producto => producto.id !== id);
    localStorage.setItem("productos", JSON.stringify(productos));
    actualizarListaProductos();
}

// Función para editar productos
function editarProducto(id) {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const producto = productos.find(p => p.id === id);
    if (producto) {
        // Cargar datos del producto en el formulario
        document.getElementById("productName").value = producto.nombre;
        document.getElementById("productPrice").value = producto.precio;
        document.getElementById("productDiscount").value = producto.descuento;
        document.getElementById("productVolume").value = producto.volumen;
        document.getElementById("productCategory").value = producto.categoria;

        // Cambiar el evento del formulario para actualizar el producto
        document.getElementById("addProductForm").onsubmit = function(event) {
            event.preventDefault();
            producto.nombre = document.getElementById("productName").value;
            producto.precio = parseFloat(document.getElementById("productPrice").value);
            producto.descuento = parseFloat(document.getElementById("productDiscount").value) || 0;
            producto.volumen = document.getElementById("productVolume").value;
            producto.categoria = document.getElementById("productCategory").value;

            // Guardar cambios y actualizar lista de productos
            localStorage.setItem("productos", JSON.stringify(productos));
            actualizarListaProductos();

            // Restaurar el formulario a su función original (añadir producto)
            document.getElementById("addProductForm").onsubmit = (e) => e.preventDefault();
            document.getElementById("addProductForm").reset();
        };
    }
}
