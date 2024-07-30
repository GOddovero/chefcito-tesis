document.addEventListener('DOMContentLoaded', function() {
   const recetasRealizadas = JSON.parse(localStorage.getItem('recetasRealizadas')) || [];
   const galleryContainer = document.getElementById('gallery-container');
 
   // Limpiar el contenedor antes de agregar nuevas imágenes
   galleryContainer.innerHTML = '';
 
   // Crear y agregar los elementos de la galería dinámicamente
   recetasRealizadas.forEach((receta, index) => {
     const figure = document.createElement('figure');
     figure.className = 'gallery-item';
 
     const img = document.createElement('img');
     img.src = receta.imagen;
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
 