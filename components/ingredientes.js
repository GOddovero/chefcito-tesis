import {getIngredietes, showAlerta, guardarIngrediente, borrarIngredientes, editarIngrediente} from "./funciones";

document.addEventListener('DOMContentLoaded', function() {
    getIngredientesData();
});

async function getIngredientesData() {
    const respuesta = await getIngredietes(); // Asumiendo que esta función está definida en otro archivo
    const ingredientesTotales = respuesta.docs;
    renderTable(ingredientesTotales);
}

function renderTable(ingredientes) {
    const ingredientesTable = document.getElementById('ingredientesTable');
    ingredientesTable.innerHTML = '';

    ingredientes.forEach(ingrediente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ingrediente.data().NOMBRE}</td>
            <td>${ingrediente.data().CANTIDAD}</td>
            <td>${ingrediente.data().UNIDAD}</td>
            <td>
                <button onclick="openModal(2, '${ingrediente.data().NOMBRE}', '${ingrediente.data().CANTIDAD}', '${ingrediente.data().UNIDAD}', '${ingrediente.data().FAVORITO}', '${ingrediente.id}')" class="btn btn-info" data-toggle="modal" data-target="#modalProducts">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button onclick="eliminarIngrediente('${ingrediente.id}', '${ingrediente.data().NOMBRE}')" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        ingredientesTable.appendChild(row);
    });
}

function openModal(op, nombre = '', cantidad = '', unidad = '', favorito = '', id = '') {
    document.getElementById('NOMBRE').value = nombre;
    document.getElementById('CANTIDAD').value = cantidad;
    document.getElementById('UNIDAD').value = unidad;
    document.getElementById('FAVORITO').value = favorito;
    document.getElementById('id').value = id;
    
    if (op === 1) {
        document.getElementById('modalTitle').innerText = 'Registrar Nuevo Ingrediente';
    } else if (op === 2) {
        document.getElementById('modalTitle').innerText = 'Editar Ingrediente';
    }
    
    setTimeout(() => {
        document.getElementById('NOMBRE').focus();
    }, 50);
}

function validar() {
    const nombre = document.getElementById('NOMBRE').value.trim();
    const cantidad = document.getElementById('CANTIDAD').value.trim();
    const unidad = document.getElementById('UNIDAD').value.trim();
    const favorito = document.getElementById('FAVORITO').value.trim();
    const id = document.getElementById('id').value;
    const operation = id ? 2 : 1;
    
    if (!nombre) {
        showAlerta('Escribe el nombre del ingrediente', 'warning');
    } else if (!cantidad) {
        showAlerta('Escribe la cantidad del ingrediente', 'warning');
    } else if (!unidad) {
        showAlerta('Seleccione la unidad de la cantidad del ingrediente', 'warning');
    } else if (!favorito) {
        showAlerta('Seleccione si el ingrediente es favorito o no', 'warning');
    } else {
        if (operation === 1) {
            guardarIngrediente(nombre, cantidad, unidad, favorito); // Asumiendo que esta función está definida en otro archivo
            document.getElementById('btnCerrar').click();
            getIngredientesData();
        } else {
            editarIngrediente(id, nombre, cantidad, unidad, favorito); // Asumiendo que esta función está definida en otro archivo
            document.getElementById('btnCerrar').click();
            getIngredientesData();
        }
    }
}

function eliminarIngrediente(IDIngredientes, NOMBRE) {
    Swal.fire({
        title: `¿Seguro quiere eliminar el ingrediente ${NOMBRE}?`,
        icon: 'question',
        text: 'No se podrá dar marcha atrás',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            borrarIngredientes(IDIngredientes); // Asumiendo que esta función está definida en otro archivo
            getIngredientesData();
        } else {
            showAlerta('El ingrediente NO fue eliminado', 'info');
        }
    });
}
