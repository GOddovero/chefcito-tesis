import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {initializeApp} from 'firebase/app';
import {getFirestore, addDoc, collection, getDocs, query, deleteDoc, doc, updateDoc} from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9AikH55edE0Vp7lBiau-q1XQgxLSZg2s",
    authDomain: "chefcito-af900.firebaseapp.com",
    projectId: "chefcito-af900",
    storageBucket: "chefcito-af900.appspot.com",
};

// Inicializa Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

// Exportar db y appFirebase para otros archivos si es necesario
export {db, appFirebase};

// Muestra una alerta con SweetAlert2
export function showAlerta(mensaje, icono, foco = "") {
    onFocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: mensaje,
        icon: icono
    });
}

// Enfoca un elemento si se proporciona un ID
function onFocus(foco) {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }
}

// Guarda un nuevo ingrediente en la colección 'ingredientes'
export const guardarIngrediente = async (NOMBRE, CANTIDAD, UNIDAD, FAVORITO) => {
    try {
        const ingredientesCollection = collection(db, 'ingredientes');
        const nuevoIngrediente = {
            NOMBRE,
            CANTIDAD,
            UNIDAD,
            FAVORITO,
        };
        const docRef = await addDoc(ingredientesCollection, nuevoIngrediente);
        console.log('Ingrediente guardado ID:', docRef.id);
    } catch (error) {
        console.error('Error en la función Guardar Ingrediente', error);
    }
}

// Obtiene todos los ingredientes de la colección 'ingredientes'
export const getIngredietes = async () => {
    try {
        const result = await getDocs(query(collection(db, 'ingredientes')));
        return result;
    } catch (error) {
        console.error('Error al obtener los ingredientes', error);
        throw error;
    }
}

// Borra un ingrediente por su ID
export const borrarIngredientes = async (id) => {
    try {
        await deleteDoc(doc(db, 'ingredientes', id));
    } catch (error) {
        console.error('Error al borrar el ingrediente', error);
        throw error;
    }
}

// Edita un ingrediente por su ID
export const editarIngrediente = async (id, NOMBRE, CANTIDAD, UNIDAD, FAVORITO) => {
    try {
        const actualizarIngrediente = {
            NOMBRE,
            CANTIDAD,
            UNIDAD,
            FAVORITO,
        };
        await updateDoc(doc(db, 'ingredientes', id), actualizarIngrediente);
    } catch (error) {
        console.error('Error al editar el ingrediente', error);
        throw error;
    }
}

// Obtiene todos los ingredientes excluyendo el campo FAVORITO
export const obtenerTodos = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'ingredientes'));
        const datosSinFavorito = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const { FAVORITO, ...datosSinFavorito } = data;
            return Object.values(datosSinFavorito);
        });
        return datosSinFavorito;
    } catch (error) {
        console.error("Error en la función obtenerTodos:", error);
        throw error;
    }
}
