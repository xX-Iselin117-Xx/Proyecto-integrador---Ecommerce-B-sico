document.getElementById("login-btn").addEventListener("click", (event) => {
    event.preventDefault(); // Evita recargar la página al enviar el formulario

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Credenciales de ejemplo
    if (username === "admin" && password === "1234") {
        localStorage.setItem("isAdminLoggedIn", "true"); 
        alert("Bienvenido, Admin");
        window.location.href = "index.html"; // Redirige a la página principal
    } else {
        alert("Credenciales incorrectas.");
    }
});
