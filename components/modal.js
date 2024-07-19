var modal_Añadir = document.getElementById("modal_Ingredientes");
var modal_Modificar = document.getElementById("modal_ModificarIngrediente");
var btn = document.getElementById("btn_Añadir");
var cerrar = document.getElementById("btn_modal_cancelar");
var cerrar_modificar = document.getElementById("btn_modal_cancelar_modificar")
var añadir = document.getElementById("bnt_modal_añadir");
var contenidoModal = document.querySelector(".contenido_modal");

btn.onclick = function() {
    modal_Añadir.style.display = "flex";
}

cerrar.onclick = function() {
    modal_Añadir.style.display = "none";
}
cerrar_modificar.onclick = function(){
    modal_Modificar.style.display = "none";
}

añadir.onclick = function() {
    modal.style.display = "none";
    console.log("Se añadio un nuevo ingrediente correctamente.")
}

// Cierra el modal cuando se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal_Añadir || event.target == modal_Modificar) {
        modal_Añadir.style.display = "none";
        modal_Modificar.style.display = "none";
    }
}

// Evita que los clics dentro del contenido del modal lo cierren
contenidoModal.onclick = function(event) {
    event.stopPropagation();
}