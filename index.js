let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length; // Reinicia al llegar al final
    slides[currentSlide].classList.add('active');
}

// Cambia de imagen cada 4 segundos
setInterval(showNextSlide, 4000);

document.getElementById("btn-buscar").addEventListener("click", () => {
    window.location.href = "error404.html"; // Redirige a la página de error
});
