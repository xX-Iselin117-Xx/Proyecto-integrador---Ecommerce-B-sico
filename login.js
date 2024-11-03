document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        localStorage.setItem("isAdmin", true);
        window.location.href = "admin.html";
    } else {
        document.getElementById("error-msg").style.display = "block";
    }
});


