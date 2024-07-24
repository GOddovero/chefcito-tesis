const auth = firebase.auth();
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

        // Añadir event listeners después de cargar el contenido del modal
        addEventListeners();
      } else {
        console.error('No se encontró el elemento modal_Perfil');
      }
    })
    .catch(error => console.error('Error al cargar el modal:', error));
}

function addEventListeners() {
  const cambiarContrasenaBtn = document.getElementById('cambiar_contraseña_Usuario_Perfil');
  const cambiarEmailBtn = document.getElementById('cambiar_email_Usuario_Perfil');
  const cambiarNombreBtn = document.getElementById('cambiar_nombre_Usuario_Perfil');
  const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

  if (cambiarContrasenaBtn) cambiarContrasenaBtn.addEventListener('click', cambiarContrasena);
  if (cambiarEmailBtn) cambiarEmailBtn.addEventListener('click', cambiarEmail);
  if (cambiarNombreBtn) cambiarNombreBtn.addEventListener('click', cambiarNombre);
  if (cerrarSesionBtn) cerrarSesionBtn.addEventListener('click', cerrarSesion);
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
// Función para cambiar la contraseña
function cambiarContrasena() {
  const contrasenaNueva = document.querySelector('#contraseña_usuario_Modal_Perfil input[type="password"]:nth-child(4)').value;
  const contrasenaConfirmar = document.querySelector('#contraseña_usuario_Modal_Perfil input[type="password"]:nth-child(6)').value;

  if (contrasenaNueva !== contrasenaConfirmar) {
      alert("Las contraseñas no coinciden");
      return;
  }

  const user = auth.currentUser;
  user.updatePassword(contrasenaNueva).then(() => {
      alert("Contraseña actualizada con éxito");
      cerrarModal();
  }).catch((error) => {
      alert("Error al actualizar la contraseña: " + error.message);
  });
}
// Función para cambiar el email
function cambiarEmail() {
  const emailNuevo = document.querySelector('#email_usuario_Modal_Perfil input[type="text"]:nth-child(4)').value;
  const emailConfirmar = document.querySelector('#email_usuario_Modal_Perfil input[type="text"]:nth-child(6)').value;

  if (emailNuevo !== emailConfirmar) {
      alert("Los emails no coinciden");
      return;
  }

  const user = auth.currentUser;
  user.updateEmail(emailNuevo).then(() => {
      alert("Email actualizado con éxito");
      cerrarModal();
  }).catch((error) => {
      alert("Error al actualizar el email: " + error.message);
  });
}
// Función para cambiar el nombre de usuario
function cambiarNombre() {
  const nombreNuevo = document.querySelector('#nombre_usuario_Modal_Perfil input[type="text"]:nth-child(4)').value;

  const user = auth.currentUser;
  user.updateProfile({
      displayName: nombreNuevo
  }).then(() => {
      alert("Nombre actualizado con éxito");
      cerrarModal();
  }).catch((error) => {
      alert("Error al actualizar el nombre: " + error.message);
  });
}
// Función para cerrar sesión
function cerrarSesion() {
  auth.signOut().then(() => {
    alert("Has cerrado sesión correctamente");
    cerrarModal();
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = '/pages/login.html'; 
  }).catch((error) => {
    alert("Error al cerrar sesión: " + error.message);
  });
}