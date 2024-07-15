var modal = document.getElementById("modal_Ingredientes");
var btn = document.getElementById("btn_Añadir");
var cerrar = document.getElementById("btn_modal_cancelar");
var contenidoModal = document.querySelector(".contenido_modal");

btn.onclick = function() {
    modal.style.display = "flex";
}

cerrar.onclick = function() {
    modal.style.display = "none";
}

// Cierra el modal cuando se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Evita que los clics dentro del contenido del modal lo cierren
contenidoModal.onclick = function(event) {
    event.stopPropagation();
}