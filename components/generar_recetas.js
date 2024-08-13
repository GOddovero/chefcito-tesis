
//Variables y Listas
var ingrediente_Principal_Activo = "No";
const listaIngredientes = JSON.parse(localStorage.getItem('listaIngredientes'));
const recetasCache = {};
console.log(listaIngredientes);
const listaIngredientesFavoritos = JSON.parse(localStorage.getItem('listaIngredientesFavoritos'));
console.log(listaIngredientesFavoritos);

//Rellenar SELECT
const selectIngredientePrincipal = document.getElementById('select_IngredientePrincipal');
// Verificamos si la lista existe y tiene elementos
if (listaIngredientesFavoritos && listaIngredientesFavoritos.length > 0) {
  // Iteramos sobre la lista y creamos una opción para cada ingrediente
  listaIngredientesFavoritos.forEach(ingrediente => {
      const option = document.createElement('option');
      option.value = ingrediente; // Asumimos que cada elemento de la lista es un string
      option.textContent = ingrediente;
      selectIngredientePrincipal.appendChild(option);
  });
} else {
  // Si la lista está vacía o no existe, añadimos una opción por defecto
  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'No hay ingredientes favoritos';
  selectIngredientePrincipal.appendChild(defaultOption);
}
function activarIngredientePrincipal() {
  var button = document.getElementById("btn_IngredientePrincipal");
  if (button.textContent === "Activar") {
    button.textContent = "Desactivar";
    ingrediente_Principal_Activo = "Si";
    button.style.backgroundColor = "rgb(203, 248, 209)";
  } else {
    button.textContent = "Activar";
    ingrediente_Principal_Activo = "No";
    button.style.backgroundColor = "rgb(244, 244, 243)";
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const botonGenerarRecetas = document.getElementById('btn_GenerarRecetas');
  botonGenerarRecetas.addEventListener('click', () => {

      generarRecetas();
  });
});

var prompt_Chefcito = "";

async function generarRecetas() {
  for (let receta in recetasCache) {
    if (recetasCache.hasOwnProperty(receta)) {
      delete recetasCache[receta];
    }
  }
  var select_Dieta = document.getElementById('select_Dieta').value;
  var select_Ingrediente_Principal = document.getElementById('select_IngredientePrincipal').value;

  if (select_Dieta == "Ninguna" && ingrediente_Principal_Activo == "No") {
    prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe], Different from the previous ones . List of ingredients:" + listaIngredientes;
    console.log("No se selecciono un tipo de dieta y no se activo ingreidente principal");
  } else if (select_Dieta == "Ninguna" && ingrediente_Principal_Activo == "Si") {
    prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe]. Keep in mind the following ingredient that has been selected as the main one:" + select_Ingrediente_Principal + " the generated recipe must include it. List of ingredients:" + listaIngredientes;
    console.log("No se selecciono un tipo de dieta , pero se seleccionó un ingrediente principal:", select_Ingrediente_Principal);
  } else if (select_Dieta != "Ninguna" && ingrediente_Principal_Activo == "No") {
    prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe]. You have selected the " + select_Dieta + " diet option, so you must strictly adhere to it when choosing ingredients. List of ingredients:" + listaIngredientes;
    console.log("Se selecciono un tipo de dieta" + select_Dieta + ", pero no se seleccionó un ingrediente principal:");
  } else {
    prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe]. You have selected the " + select_Dieta + " diet option, so you must strictly adhere to it when choosing ingredients. Keep in mind the following ingredient that has been selected as the main one:" + select_Ingrediente_Principal + ". List of ingredients:" + listaIngredientes;
    console.log("Se selecciono un tipo de dieta", select_Dieta + " y se selecciono como ingrediente principal: " + select_Ingrediente_Principal);
  }

  console.log("Prompt generado:", prompt_Chefcito);

  try {
    const response = await fetch('http://localhost:8000/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: prompt_Chefcito })
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud al servidor');
    }

    const data = await response.json();
    const recetas = data.choices[0]?.message?.content || "";
    const recetasArray = recetas.split('\n\n'); 
    console.log(recetas); 

    const nombresRecetas = [];
    const descripcionesRecetas = [];

    recetasArray.forEach((receta, index) => {
      const recetaParts = receta.split("'nombre': ");
      if (recetaParts.length >= 2) {
        const recetaNombre = recetaParts[1].split("'descripción': ")[0].trim().replace(/'/g, '');
        const recetaDescripcion = recetaParts[1].split("'descripción': ")[1].trim().replace(/'/g, '');

        nombresRecetas[index] = recetaNombre;
        descripcionesRecetas[index] = recetaDescripcion;
      }
    });

    for (let i = 2; i <= 4; i++) {
      const recetaDiv = document.getElementById(`tarjeta_NuevaReceta_${i}`);
      if (recetaDiv && nombresRecetas[i - 1] && descripcionesRecetas[i - 1]) {
        const nombreElement = recetaDiv.querySelector(`#nombre_Receta_${i}`);
        const descripcionElement = recetaDiv.querySelector(`#descripcion_Receta_${i}`);
        
        nombreElement.textContent = nombresRecetas[i - 1];
        descripcionElement.textContent = descripcionesRecetas[i - 1];
      }
    }
    
    let generar_Imagen = localStorage.getItem('generar_Imagen') || "No";
    if (generar_Imagen === "Si") {
      generarYActualizarImagenes(descripcionesRecetas);
    } else {
      console.log("No se generarán imágenes");
    }
  } catch (error) {
    console.error('Error generando recetas:', error);
  }

  async function generarYActualizarImagenes(descripcionesRecetas) {
    var prompt_por_defecto = "Generate a realistic image of a white plate with highlighted ingredients. The composition should be simple and focus solely on the elements described in the following recipe. Do not add any additional elements to the image:";
    
    var OPENAI_API_KEY = "";

    async function generateAiImages(userPrompt) {
        try {
            var response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + OPENAI_API_KEY
                },
                body: JSON.stringify({
                    prompt: userPrompt,
                    n: 1,
                    size: "256x256",
                    response_format: "b64_json"
                })
            });

            if (!response.ok) throw new Error("Fallo al generar imágenes");

            var jsonResponse = await response.json();
            return jsonResponse.data[0].b64_json;
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    // Array para almacenar las promesas de generación de imágenes
    const imagePromises = [];

    // Establecer el src de las imágenes a /img/loading.gif antes de comenzar la generación
    for (let i = 1; i < 4; i++) {
        const recetaDiv = document.getElementById(`tarjeta_NuevaReceta_${i+1}`);
        if (recetaDiv) {
            const imgElement = recetaDiv.querySelector(`#img_Recetas_${i+1}`);
            if (imgElement) {
                imgElement.src = "/img/loading.gif"; // Mostrar indicador de carga
            }
        }
    }

    // Generar promesas para las 3 recetas
    for (let i = 1; i < 4; i++) {
        if (!descripcionesRecetas[i]) {
            console.log("Descripción de receta no definida en el índice:", i);
            continue; // Saltar si la descripción no está definida
        }

        var userPrompt = prompt_por_defecto + descripcionesRecetas[i];
        console.log("Generando imagen para el prompt:", userPrompt); // Imprimir el prompt por consola

        // Generar la promesa para la imagen y almacenarla en el array
        const imagePromise = generateAiImages(userPrompt)
            .then(imgData => {
                const recetaDiv = document.getElementById(`tarjeta_NuevaReceta_${i+1}`);
                if (recetaDiv && imgData) {
                    const imgElement = recetaDiv.querySelector(`#img_Recetas_${i+1}`);
                    if (imgElement) {
                        imgElement.src = "data:image/jpeg;base64," + imgData;
                    }
                }
            })
            .catch(error => {
                console.error('Error generando imagen:', error);
            });

        imagePromises.push(imagePromise);
    }

    // Esperar a que se completen todas las promesas
    try {
        await Promise.all(imagePromises);
        console.log("Todas las imágenes generadas y actualizadas correctamente.");
        almacenarRecetas();
    } catch (error) {
        console.error('Error al generar imágenes:', error);
    }
}
almacenarRecetas();
}
window.onload = generarRecetas();

function cerrarModalRecetas() {
  document.getElementById("modal_Receta_Seleccionada").style.display = "none";

}
// Objeto para almacenar en caché los pasos de las recetas


async function seleccionarReceta(recetaId) {
  // Objeto que contiene la información de cada receta
  const recetas = {
    receta_2: {
      nombre: document.getElementById("nombre_Receta_2").innerText,
      descripcion: document.getElementById("descripcion_Receta_2").innerText,
      imagen: document.getElementById("img_Recetas_2").src,
    },
    receta_3: {
      nombre: document.getElementById("nombre_Receta_3").innerText,
      descripcion: document.getElementById("descripcion_Receta_3").innerText,
      imagen: document.getElementById("img_Recetas_3").src,
    },
    receta_4: {
      nombre: document.getElementById("nombre_Receta_4").innerText,
      descripcion: document.getElementById("descripcion_Receta_4").innerText,
      imagen: document.getElementById("img_Recetas_4").src,
    }
  };

  // Obtener la receta seleccionada
  const receta = recetas[recetaId];
  if (receta) {
    // Cambiar el src de la imagen a un indicador de carga
    document.getElementById("img_Recetas_4").src = "/img/loading.gif";

    // Actualizar el contenido del modal con la información de la receta
    document.getElementById("img_Recetas_Seleccionada").src = receta.imagen;
    document.getElementById("nombre_Receta_Seleccionada").innerText = receta.nombre;
    document.getElementById("descripcion_Receta_Seleccionada").innerText = receta.descripcion;

    // Mostrar el modal
    document.getElementById("modal_Receta_Seleccionada").style.display = "block";

    // Verificar si los pasos ya están en caché
    if (recetasCache[recetaId]) {
      // Si están en caché, mostrarlos directamente
      document.getElementById("pasos_Receta_Seleccionada").innerHTML = recetasCache[recetaId];
      
      // Volver a mostrar la imagen original
      document.getElementById("img_Recetas_4").src = receta.imagen;
      return;
    }

    // Preparar el prompt para la IA
    var pasos_receta = "Please generate the following HTML recipe: <h2>{receta.nombre}</h2><ul><li><b>Ingredientes:</b></li><ul>{listaIngredientes}</ul><li><b>Pasos:</b></li><ol>I need you to generate the steps to make the following recipe. Here is the description of the dish: " + receta.descripcion + " and the name of the dish: " + receta.nombre + ". The output should be in HTML format with tags and in Spanish. The cooking time should be included. Please keep in mind that I only have the following ingredients to make the recipe: " + listaIngredientes + ". Approximate preparation time: {tiempoPreparacion} minutos. Again, the output should be in HTML format with tags and in Spanish so I can paste it into my web page using JavaScript.</ol></ul>"

    try {
      // Hacer la solicitud a la API de Groq
      const response = await fetch('http://localhost:8000/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: pasos_receta })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor');
      }

      // Procesar la respuesta
      const data = await response.json();
      const iaResponse = data.choices[0]?.message?.content || "";
      
      // Extraer solo la parte HTML de la respuesta
      const htmlStartIndex = iaResponse.indexOf('<h2>');
      const htmlEndIndex = iaResponse.lastIndexOf('</ol>') + 5;
      const htmlContent = iaResponse.substring(htmlStartIndex, htmlEndIndex);

      // Guardar en caché
      recetasCache[recetaId] = htmlContent;

      // Colocar la respuesta en el div especificado
      const pasosDiv = document.getElementById("pasos_Receta_Seleccionada");
      pasosDiv.innerHTML = htmlContent;

      // Volver a mostrar la imagen original
      document.getElementById("img_Recetas_4").src = receta.imagen;

    } catch (error) {
      // Manejar errores
      console.error('Error al consultar la IA:', error);
      document.getElementById("pasos_Receta_Seleccionada").innerHTML = "Error al obtener los pasos de la receta. Por favor, intenta de nuevo.";

      // Volver a mostrar la imagen original en caso de error
      document.getElementById("img_Recetas_4").src = receta.imagen;
    }
  } else {
    console.error('Receta no encontrada');
  }
}
function almacenarRecetas() {
  // Selecciona todas las tarjetas de recetas
  var tarjetas = document.querySelectorAll('.tarjeta_NuevaReceta');
  
  // Array para almacenar las recetas
  var recetas_recientes = [];

  // Recorre cada tarjeta de receta
  for (var i = 0; i < tarjetas.length; i++) {
      var tarjeta = tarjetas[i];

      // Obtiene el nombre, la descripción y la imagen
      var nombre = tarjeta.querySelector('p').textContent;
      var descripcion = tarjeta.querySelector('text').textContent;
      var img = tarjeta.querySelector('img').src;

      // Verificar si la imagen es loading.gif y cambiarla por una imagen por defecto aleatoria
      if (img === 'http://localhost:3000/img/loading.gif') {
          var randomImgIndex = Math.floor(Math.random() * 3) + 2; // Genera un número aleatorio entre 2 y 4
          img = `http://localhost:3000/img/defecto_${randomImgIndex}.png`;
      };

      // Crea un objeto para la receta
      var receta_guardar = {
          nombre: nombre,
          descripcion: descripcion,
          img: img
      };

      // Agrega la receta al array
      recetas_recientes.push(receta_guardar);
  }

  // Recupera las recetas existentes desde localStorage
  var recetas_existentes = JSON.parse(localStorage.getItem('recetas_recientes')) || [];

  // Añade las nuevas recetas a las recetas existentes
  recetas_existentes = recetas_existentes.concat(recetas_recientes);

  // Mantiene solo las últimas 9 recetas
  if (recetas_existentes.length > 9) {
      recetas_existentes = recetas_existentes.slice(-9);
  }

  // Guarda el array actualizado de recetas en localStorage
  localStorage.setItem('recetas_recientes', JSON.stringify(recetas_existentes));
}


function añadirFavorito() {
  // Obtener los datos de la receta seleccionada
  const nombre = document.getElementById('nombre_Receta_Seleccionada').innerText;
  const descripcion = document.getElementById('descripcion_Receta_Seleccionada').innerText;
  const imgSrc = document.getElementById('img_Recetas_Seleccionada').src;
  const pasos = document.getElementById('pasos_Receta_Seleccionada').innerHTML;

  // Crear un objeto con la información de la receta
  const receta = {
    nombre: nombre,
    descripcion: descripcion,
    imgSrc: imgSrc,
    pasos: pasos
  };

  // Obtener las recetas guardadas en localStorage
  let recetasFavoritas = JSON.parse(localStorage.getItem('recetasFavoritas')) || [];

  // Añadir la nueva receta al principio de la lista
  recetasFavoritas.unshift(receta);

  // Limitar el almacenamiento a 12 recetas
  if (recetasFavoritas.length > 12) {
    recetasFavoritas.pop();
  }

  // Guardar las recetas actualizadas en localStorage
  localStorage.setItem('recetasFavoritas', JSON.stringify(recetasFavoritas));

  // Confirmar al usuario que la receta se ha añadido a favoritos
  alert('¡Receta añadida a favoritos!');
}
