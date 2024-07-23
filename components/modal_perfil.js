var modal = document.getElementById("modal_Perfil");
var contenidoModal = document.querySelector(".contenido_Modal_Perfil");

// Escucha el evento onclick en el botón o elemento que activa el modal
document.getElementById('btn_modal_perfil').addEventListener('click', function () {
  modalPerfil();
});

// Función que se ejecuta cuando se hace clic en el botón
function modalPerfil() {
  var modal = document.getElementById('modal_Perfil');

  // Realiza una solicitud fetch para obtener el contenido del modal
  console.log("Abriendo el Modal");
  fetch('/components/modalPerfil.html')
    .then(response => response.text())
    .then(data => {
      // Inserta el contenido del modal en el contenedor adecuado
      document.getElementById('modal_Perfil').innerHTML = data;
      if (modal) {
        modal.style.display = 'block';

        // Abrir por defecto la pestaña "personalizar_Modal_Perfil"
        openTab(null, 'personalizar_Modal_Perfil');
        document.querySelector(".tab-link[onclick*='personalizar_Modal_Perfil']").classList.add("active");
      } else {
        console.error('No se encontró el elemento modal_Perfil');
      }
    })
    .catch(error => console.error('Error al cargar el modal:', error));
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Ocultar todos los contenidos de las pestañas
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remover la clase 'active' de todos los enlaces de pestañas
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Mostrar el contenido de la pestaña actual y agregar la clase 'active' al botón que abrió la pestaña
  document.getElementById(tabName).style.display = "block";
  if (evt) {
    evt.currentTarget.className += " active";
  }
}

function cerrarModal() {
  var modal = document.getElementById('modal_Perfil');
  if (modal) {
    modal.style.display = 'none';
    console.log("Cerrando el Modal");
  } else {
    console.error('No se encontró el elemento modal_Perfil');
  }
}
