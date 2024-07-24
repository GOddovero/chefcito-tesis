const contenedorLogin = document.querySelector('.contenedor_Login');
const contenedorRegistrar = document.querySelector('.contenedor_Registrar');
const btnIngresarSesion = document.querySelector('.btn_IngresarSesion');
const btnRegistrar = document.querySelector('.btn_Registrar');

// Obtener la instancia de Auth de Firebase
const auth = firebase.auth();

// Función para mostrar el formulario de registro
export function habilitarRegistrar() {
    contenedorLogin.style.display = 'none';
    contenedorRegistrar.style.display = 'block';
}

// Función para mostrar el formulario de login
export function habilitarLogin() {
    contenedorRegistrar.style.display = 'none';
    contenedorLogin.style.display = 'block';
}

// Función para manejar el inicio de sesión
function iniciarSesion() {
    const email = document.querySelector('.input_Login input[type="text"]').value;
    const password = document.querySelector('.input_Login input[type="password"]').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            const user = userCredential.user;
            console.log("Sesión iniciada:", user);
            
            // Redirigir a la página de Ingredientes
            window.location.href = 'ingredientes.html';
        })
        .catch((error) => {
            console.error("Error en el inicio de sesión:", error.message);
            alert("Error en el inicio de sesión: " + error.message);
        });
}

// Función para manejar el registro
function registrarUsuario() {
    const email = document.querySelector('.input_Registrar input[placeholder="Email"]').value;
    const password = document.querySelector('.input_Registrar input[type="password"]').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuario registrado exitosamente
            const user = userCredential.user;
            console.log("Usuario registrado:", user);
            alert("Registro exitoso");
            // Aquí puedes redirigir al usuario o actualizar la UI
        })
        .catch((error) => {
            console.error("Error en el registro:", error.message);
            alert("Error en el registro: " + error.message);
        });
}

// Event listeners
btnIngresarSesion.addEventListener('click', iniciarSesion);
btnRegistrar.addEventListener('click', registrarUsuario);

// Exportar funciones para que sean accesibles desde el HTML
window.habilitarRegistrar = habilitarRegistrar;
window.habilitarLogin = habilitarLogin;

// Función para verificar el estado de autenticación
auth.onAuthStateChanged((user) => {
    if (user) {
        // El usuario está autenticado
        console.log("Usuario autenticado:", user);
        // Aquí puedes actualizar la UI para usuarios autenticados
    } else {
        // El usuario no está autenticado
        console.log("Usuario no autenticado");
        // Aquí puedes actualizar la UI para usuarios no autenticados
    }
});

// Función para cerrar sesión (opcional)
function cerrarSesion() {
    auth.signOut().then(() => {
        console.log("Sesión cerrada");
        // Actualizar UI después de cerrar sesión
    }).catch((error) => {
        console.error("Error al cerrar sesión:", error);
    });
}

// Si decides agregar un botón de cerrar sesión, puedes usar:
// const btnCerrarSesion = document.querySelector('.btn_CerrarSesion');
// btnCerrarSesion.addEventListener('click', cerrarSesion);