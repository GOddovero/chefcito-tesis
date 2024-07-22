// Escucha el evento onclick en el botón o elemento que activa el modal
document.getElementById('btn_modal_perfil').addEventListener('click', function() {
    // Llama a la función modalPerfil cuando el botón es clicado
    modalPerfil();
  });
  
  // Función que se ejecuta cuando se hace clic en el botón
  function modalPerfil() {
    // Realiza una solicitud fetch para obtener el contenido del modal
    fetch('/components/modalPerfil.html')
      .then(response => response.text())
      .then(data => {
        // Inserta el contenido del modal en el contenedor adecuado
        document.getElementById('modal_Perfil').innerHTML = data;
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
  
  // Por defecto, abrir la pestaña "Personalizar Recetas"
  document.addEventListener("DOMContentLoaded", function() {
    openTab(null, 'personalizar_Modal_Perfil');
    document.querySelector(".tab-link[onclick*='personalizar_Modal_Perfil']").classList.add("active");
  });
  