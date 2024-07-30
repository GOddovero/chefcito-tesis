import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, getDoc, addDoc } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';
// Manejador global de promesas rechazadas
window.addEventListener('unhandledrejection', function (event) {
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
        if (datos.FAVORITO === "true") {
            listaIngredientesFavoritos.push(`${datos.NOMBRE}`);
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
        if (datos.FAVORITO === "true") {
            botonFavorito.innerHTML = '<img class="img_boton_tabla" src="/img/icon/icon-fav-true.png">';
        } else {
            botonFavorito.innerHTML = '<img class="img_boton_tabla" src="/img/icon/icon-fav-false.png">';
        }
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

// Función para abrir el modal de modificación
function abrirModalModificacion(id, ingredientes) {
    const modal = document.getElementById("modal_ModificarIngrediente");

    // Obtener los datos del ingrediente
    const docRef = doc(db, ingredientes, id);
    getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
            const datos = docSnap.data();
            // Rellenar los campos del modal con los datos actuales
            document.getElementById("NOMBRE_INGREDIENTE_MOD").value = datos.NOMBRE;
            document.getElementById("CANTIDAD_INGREDIENTE_MOD").value = datos.CANTIDAD;
            document.getElementById("UNIDAD_INGREDIENTE_MOD").value = datos.UNIDAD;
        } else {
            console.log("No se encontró el documento");
        }
    }).catch((error) => {
        console.error("Error obteniendo el documento:", error);
    });

    // Cambiar el event listener del botón de actualizar
    document.getElementById("btn_modal_actualizar").onclick = function() {
        actualizarIngrediente(id, ingredientes);
        cerrarModal(modal);
    };

    // Mostrar el modal
    modal.style.display = "flex";
}

// Función para actualizar un ingrediente
async function actualizarIngrediente(id, ingredientes) {
    const nombre = document.getElementById("NOMBRE_INGREDIENTE_MOD").value;
    const cantidad = document.getElementById("CANTIDAD_INGREDIENTE_MOD").value;
    const unidad = document.getElementById("UNIDAD_INGREDIENTE_MOD").value;

    if (!nombre || !cantidad || !unidad) {
        alert('Por favor, rellena todos los campos');
        return;
    }

    try {
        const docRef = doc(db, ingredientes, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Actualizar el documento existente
            await updateDoc(docRef, {
                NOMBRE: nombre,
                CANTIDAD: cantidad,
                UNIDAD: unidad
            });

            console.log("Documento actualizado correctamente");

            // Actualizar la tabla
            obtenerDatosYRellenarTabla(ingredientes);
        } else {
            console.log("No se encontró el documento");
        }
    } catch (error) {
        console.error("Error actualizando documento: ", error);
    }
}

// Función para cerrar un modal
function cerrarModal(modal) {
    modal.style.display = "none";
}

// Función para editar un ingrediente (llama a abrirModalModificacion)
function editarIngrediente(id, ingredientes) {
    abrirModalModificacion(id, ingredientes);
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

// Función para marcar/desmarcar como favorito
async function marcarFavorito(id, ingredientes) {
    try {
        const docRef = doc(db, ingredientes, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const favoritoActual = docSnap.data().FAVORITO === "true";
            await updateDoc(docRef, {
                FAVORITO: (!favoritoActual).toString()
            });
            console.log(favoritoActual ? "Desmarcado como favorito" : "Marcado como favorito");
            obtenerDatosYRellenarTabla(ingredientes);
        } else {
            console.log("No se encontró el documento");
        }
    } catch (error) {
        console.error("Error al cambiar estado de favorito: ", error);
    }
}

// Función para añadir un nuevo ingrediente
async function añadirIngrediente() {
    const nombre = document.getElementById('NOMBRE_INGREDIENTE').value;
    const cantidad = document.getElementById('CANTIDAD_INGREDIENTE').value;
    const unidad = document.getElementById('UNIDAD_INGREDIENTE').value;

    if (!nombre || !cantidad || !unidad) {
        alert('Por favor, rellena todos los campos');
        return;
    }

    try {
        const docRef = await addDoc(collection(db, 'ingredientes'), {
            NOMBRE: nombre,
            CANTIDAD: cantidad,
            UNIDAD: unidad,
            FAVORITO: "false"  // Por defecto, el nuevo ingrediente no es favorito
        });
        console.log("Documento añadido con ID: ", docRef.id);

        // Limpiar los campos del modal
        document.getElementById('NOMBRE_INGREDIENTE').value = '';
        document.getElementById('CANTIDAD_INGREDIENTE').value = '';
        document.getElementById('UNIDAD_INGREDIENTE').value = '';

        // Cerrar el modal (asumiendo que tienes una función para esto)
        cerrarModal(document.getElementById("modal_AñadirIngrediente"));

        // Recargar la tabla
        obtenerDatosYRellenarTabla('ingredientes');
    } catch (e) {
        console.error("Error añadiendo documento: ", e);
    }
}

document.body.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'bnt_modal_añadir') {
      añadirIngrediente();
    }
  });

  document.body.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'btn_recargar') {
        obtenerDatosYRellenarTabla('ingredientes');
    }
});

// Llamar a la función para rellenar la tabla inicialmente
document.addEventListener('DOMContentLoaded', function() {
    obtenerDatosYRellenarTabla('ingredientes');
});
