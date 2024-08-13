document.addEventListener('DOMContentLoaded', function() {
   const recetasRealizadas = JSON.parse(localStorage.getItem('recetas_recientes')) || [];
   const galleryContainer = document.getElementById('gallery-container');
 
   // Limpiar el contenedor antes de agregar nuevas imágenes
   galleryContainer.innerHTML = '';
 
   // Crear y agregar los elementos de la galería dinámicamente
   recetasRealizadas.forEach((receta, index) => {
     const figure = document.createElement('figure');
     figure.className = 'gallery-item';
 
     const img = document.createElement('img');
     img.src = receta.img;
     img.alt = `Imagen ${index + 1}`;
 
     const figcaption = document.createElement('figcaption');
     figcaption.innerText = receta.nombre;
 
     figure.appendChild(img);
     figure.appendChild(figcaption);
     galleryContainer.appendChild(figure);
   });
 
   // Opcional: Agregar funcionalidad a los botones de navegación
   const prevButton = document.querySelector('.prev-button');
   const nextButton = document.querySelector('.next-button');
 
   let currentIndex = 0;
   const itemsPerPage = 2; // Número de imágenes visibles por página
 
   function updateGallery() {
     const items = document.querySelectorAll('.gallery-item');
     items.forEach((item, index) => {
       item.style.display = (index >= currentIndex && index < currentIndex + itemsPerPage) ? 'block' : 'none';
     });
   }
 
   prevButton.addEventListener('click', () => {
     currentIndex = Math.max(0, currentIndex - itemsPerPage);
     updateGallery();
   });
 
   nextButton.addEventListener('click', () => {
     currentIndex = Math.min(recetasRealizadas.length - itemsPerPage, currentIndex + itemsPerPage);
     updateGallery();
   });
 
   // Inicializar la galería
   updateGallery();
 });
 function mostrarRecetasFavoritas() {
  // Obtener el contenedor donde se mostrarán las recetas favoritas
  const contenedor = document.querySelector('.contenedor_RecetasFavoritas');
  
  // Limpiar el contenedor antes de agregar las recetas
  contenedor.innerHTML = '';

  // Obtener las recetas guardadas en localStorage
  const recetasFavoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

  // Recorrer las recetas y añadirlas al contenedor
  recetasFavoritas.forEach((receta, index) => {
    const recetaHtml = `
      <div class="tarjeta_RecetasFavoritas">
        <img src="${receta.imgSrc}" class="img_Recetas">
        <p>${receta.nombre}</p>
        <text>${receta.descripcion}</text>
        <div class="contenedor_Botones_RecetasFavoritas">
          <button class="btn_EliminarFavorito" onclick="eliminarFavorito(${index})">Eliminar</button>
          <button class="btn_seleccionarReceta" onclick="seleccionarReceta(${index})">Seleccionar Receta</button>
        </div>
      </div>
    `;
    contenedor.innerHTML += recetaHtml;
  });
}
function eliminarFavorito(index) {
  // Obtener las recetas guardadas en localStorage
  let recetasFavoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

  // Eliminar la receta en el índice especificado
  recetasFavoritas.splice(index, 1);

  // Guardar las recetas actualizadas en localStorage
  localStorage.setItem('recetasFavoritas', JSON.stringify(recetasFavoritas));

  // Actualizar la lista de recetas favoritas en la interfaz
  mostrarRecetasFavoritas();
}
function seleccionarReceta(index) {
  // Obtener las recetas guardadas en localStorage
  const recetasFavoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

  // Obtener la receta seleccionada
  const recetaSeleccionada = recetasFavoritas[index];

  // Llenar el modal con la información de la receta seleccionada
  document.getElementById('nombre_Receta_Seleccionada').innerText = recetaSeleccionada.nombre;
  document.getElementById('descripcion_Receta_Seleccionada').innerText = recetaSeleccionada.descripcion;
  document.getElementById('img_Recetas_Seleccionada').src = recetaSeleccionada.imgSrc;
  document.getElementById('pasos_Receta_Seleccionada').innerHTML = recetaSeleccionada.pasos;

  // Mostrar el modal (suponiendo que tienes una función para esto)
  mostrarModalRecetaSeleccionada();
}
document.addEventListener('DOMContentLoaded', mostrarRecetasFavoritas);
let recetaSeleccionadaIndex = null;

function seleccionarReceta(index) {
  // Obtener las recetas guardadas en localStorage
  const recetasFavoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

  // Guardar el índice de la receta seleccionada
  recetaSeleccionadaIndex = index;

  // Obtener la receta seleccionada
  const recetaSeleccionada = recetasFavoritas[index];

  // Llenar el modal con la información de la receta seleccionada
  document.getElementById('nombre_Receta_Seleccionada').innerText = recetaSeleccionada.nombre;
  document.getElementById('descripcion_Receta_Seleccionada').innerText = recetaSeleccionada.descripcion;
  document.getElementById('img_Recetas_Seleccionada').src = recetaSeleccionada.imgSrc;
  document.getElementById('pasos_Receta_Seleccionada').innerHTML = recetaSeleccionada.pasos;

  // Mostrar el modal (suponiendo que tienes una función para esto)
  mostrarModalRecetaSeleccionada();
}

function mostrarModalRecetaSeleccionada() {
  const modal = document.getElementById('modal_Receta_Seleccionada');
  modal.style.display = 'block';
}

function cerrarModalRecetas() {
  const modal = document.getElementById('modal_Receta_Seleccionada');
  modal.style.display = 'none';
}
function quitarFavorito() {
  if (recetaSeleccionadaIndex === null) return;

  // Obtener las recetas guardadas en localStorage
  let recetasFavoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

  // Eliminar la receta en el índice especificado
  recetasFavoritas.splice(recetaSeleccionadaIndex, 1);

  // Guardar las recetas actualizadas en localStorage
  localStorage.setItem('recetasFavoritas', JSON.stringify(recetasFavoritas));

  // Actualizar la lista de recetas favoritas en la interfaz
  mostrarRecetasFavoritas();

  // Cerrar el modal
  cerrarModalRecetas();

  // Resetear el índice de la receta seleccionada
  recetaSeleccionadaIndex = null;

  // Confirmar al usuario que la receta se ha quitado de favoritos
  alert('¡Receta quitada de favoritos!');
}
