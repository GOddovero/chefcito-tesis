const auth = firebase.auth();

document.body.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'btn_modal_perfil') {
      modalPerfil();
  }
});


function modalPerfil() {
  var modal = document.getElementById('modal_Perfil');

  console.log("Abriendo el Modal");
  fetch('/components/modalPerfil.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('modal_Perfil').innerHTML = data;
      if (modal) {
        modal.style.display = 'block';

        openTab(null, 'personalizar_Modal_Perfil');
        document.querySelector(".tab-link[onclick*='personalizar_Modal_Perfil']").classList.add("active");

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
  const closeBtn = document.querySelector('.close');

  if (cambiarContrasenaBtn) cambiarContrasenaBtn.addEventListener('click', cambiarContrasena);
  if (cambiarEmailBtn) cambiarEmailBtn.addEventListener('click', cambiarEmail);
  if (cambiarNombreBtn) cambiarNombreBtn.addEventListener('click', cambiarNombre);
  if (cerrarSesionBtn) cerrarSesionBtn.addEventListener('click', cerrarSesion);
  if (closeBtn) closeBtn.addEventListener('click', cerrarModal);
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

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

function cambiarContrasena() {
  const contrasenaActual = document.getElementById('contraseña_actual').value;
  const contrasenaNueva = document.getElementById('contraseña_nueva').value;
  const contrasenaConfirmar = document.getElementById('contraseña_nueva_confirmar').value;

  if (contrasenaNueva !== contrasenaConfirmar) {
      alert("Las contraseñas no coinciden");
      return;
  }

  const user = auth.currentUser;
  const credenciales = firebase.auth.EmailAuthProvider.credential(user.email, contrasenaActual);

  user.reauthenticateWithCredential(credenciales).then(() => {
      user.updatePassword(contrasenaNueva).then(() => {
          alert("Contraseña actualizada con éxito");
          cerrarModal();
      }).catch((error) => {
          alert("Error al actualizar la contraseña: " + error.message);
      });
  }).catch((error) => {
      alert("Error al reautenticar: " + error.message);
  });
}

function cambiarEmail() {
  const emailNuevo = document.querySelector('#cambiar_email_Usuario_Perfil input[type="text"]:nth-child(2)').value;
  const emailConfirmar = document.querySelector('#cambiar_email_Usuario_Perfil input[type="text"]:nth-child(4)').value;

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

function cambiarNombre() {
  const nombreNuevo = document.querySelector('#nombre_usuario_Modal_Perfil input[type="text"]').value;

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

function cerrarSesion() {
  auth.signOut().then(() => {
    alert("Has cerrado sesión correctamente");
    cerrarModal();
    window.location.href = '/pages/login.html'; 
  }).catch((error) => {
    alert("Error al cerrar sesión: " + error.message);
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('generar_Imagen') === null) {
    localStorage.setItem('generar_Imagen', 'No');
  }

  var generar_Imagen = localStorage.getItem('generar_Imagen');
  var btn = document.getElementById("btn_GeneracionImagenes");

  if (generar_Imagen === "Si") {
    btn.textContent = "Generar Imagenes: NO";
    btn.style.backgroundColor = "rgb(203, 248, 209)";
  } else {
    btn.textContent = "Generar Imagenes: SI";
    btn.style.backgroundColor = "rgb(244, 244, 243)";
  }
});

function activarGeneracionImagenes() {
  var btn = document.getElementById("btn_GeneracionImagenes");
  var generar_Imagen;

  if (btn.textContent === "Generar Imagenes: SI") {
    btn.textContent = "Generar Imagenes: DESACTIVAR";
    generar_Imagen = "Si";
    btn.style.backgroundColor = "rgb(203, 248, 209)";
  } else {
    btn.textContent = "Generar Imagenes: ACTIVAR";
    generar_Imagen = "No";
    btn.style.backgroundColor = "rgb(244, 244, 243)";
  }
  console.log(generar_Imagen)
  localStorage.setItem('generar_Imagen', generar_Imagen);
}
