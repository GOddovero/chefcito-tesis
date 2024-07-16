import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyD9AikH55edE0Vp7lBiau-q1XQgxLSZg2s",
    authDomain: "chefcito-af900.firebaseapp.com",
    projectId: "chefcito-af900",
    storageBucket: "chefcito-af900.appspot.com",
};

// Manejador global de errores
window.onerror = function(message, source, lineno, colno, error) {
    return true;
};

// Manejador global de promesas rechazadas
window.addEventListener('unhandledrejection', function(event) {
    event.preventDefault();
});

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lista global de ingredientes
let listaIngredientes = [];
// Lista global de ingredientes favoritos
let listaIngredientesFavoritos = [];

// Función para obtener todos los documentos de una colección y rellenar la tabla
async function obtenerDatosYRellenarTabla(ingredientes) {
    const tablaBody = document.getElementById('tabla-body');

    tablaBody.innerHTML = ''; // Limpiar tabla antes de rellenar
    listaIngredientes = []; // Limpiar la lista de ingredientes antes de rellenar
    listaIngredientesFavoritos = []; // Limpiar la lista de ingredientes favoritos antes de rellenar

    const coleccionRef = collection(db, ingredientes);
    const snapshot = await getDocs(coleccionRef);

    snapshot.forEach(function (doc) {
        const datos = doc.data();
        const fila = document.createElement('tr');

        // Crear celdas para NOMBRE, CANTIDAD y UNIDAD
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = datos.NOMBRE || '';

        const celdaCantidad = document.createElement('td');
        celdaCantidad.textContent = datos.CANTIDAD || '';

        const celdaUnidad = document.createElement('td');
        celdaUnidad.textContent = datos.UNIDAD || '';

        // Guardar el ingrediente en la lista global
        listaIngredientes.push(`${datos.NOMBRE}, ${datos.CANTIDAD} ${datos.UNIDAD}`);

        // Si el ingrediente es favorito, agregarlo a la lista de favoritos
        if (datos.favorito === true) {
            listaIngredientesFavoritos.push(`${datos.NOMBRE}, ${datos.CANTIDAD} ${datos.UNIDAD}`);
        }

        // Crear celda para ACCIONES
        const celdaAcciones = document.createElement('td');
        celdaAcciones.className = 'btn_acciones';

        // Botón Editar
        const botonEditar = document.createElement('button');
        botonEditar.className = 'btn_edit';
        botonEditar.innerHTML = '<img class="img_boton_tabla" src="/img/icon/icons8-edit-90.png">';
        botonEditar.onclick = function () {
            editarIngrediente(doc.id, ingredientes);
        };

        // Botón Eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn_eliminar';
        botonEliminar.innerHTML = '<img class="img_boton_tabla" src="/img/icon/icons8-trash-48.png">';
        botonEliminar.onclick = function () {
            eliminarIngrediente(doc.id, ingredientes);
        };

        // Botón Favorito
        const botonFavorito = document.createElement('button');
        botonFavorito.className = 'btn_fav';
        botonFavorito.innerHTML = '<img class="img_boton_tabla" src="/img/icon/icons8-star-50.png">';
        botonFavorito.onclick = function () {
            marcarFavorito(doc.id, ingredientes);
        };

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);
        celdaAcciones.appendChild(botonFavorito);

        // Añadir todas las celdas a la fila
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaUnidad);
        fila.appendChild(celdaAcciones);

        // Añadir la fila al cuerpo de la tabla
        tablaBody.appendChild(fila);
    });
    // Guardar la lista de ingredientes en localStorage
    localStorage.setItem('listaIngredientes', JSON.stringify(listaIngredientes));
    // Guardar la lista de ingredientes favoritos en localStorage
    localStorage.setItem('listaIngredientesFavoritos', JSON.stringify(listaIngredientesFavoritos));
    console.log(listaIngredientes);
    console.log(listaIngredientesFavoritos);
}

// Función para eliminar un ingrediente
async function eliminarIngrediente(id, ingredientes) {
    try {
        await deleteDoc(doc(db, ingredientes, id));
        console.log("Documento eliminado correctamente");
        // Recargar la tabla
        obtenerDatosYRellenarTabla(ingredientes);
    } catch (error) {
        console.error("Error eliminando documento: ", error);
    }
}

// Función para editar un ingrediente (placeholder)
function editarIngrediente(id, ingredientes) {
    console.log('Editar ingrediente con ID: ' + id);
    // Aquí irá la lógica para editar el ingrediente
}

// Función para marcar como favorito
async function marcarFavorito(id, ingredientes) {
    try {
        const docRef = doc(db, ingredientes, id);
        await updateDoc(docRef, {
            favorito: true
        });
        console.log("Marcado como favorito");
        obtenerDatosYRellenarTabla(ingredientes);
    } catch (error) {
        console.error("Error al marcar como favorito: ", error);
    }
}

// Llamar a la función para rellenar la tabla
obtenerDatosYRellenarTabla('ingredientes');

// Agregar event listener al botón de recargar
document.getElementById('btn_recargar').addEventListener('click', function () {
    obtenerDatosYRellenarTabla('ingredientes');
});