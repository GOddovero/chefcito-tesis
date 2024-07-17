//Variables y Listas
var ingrediente_Principal_Activo = "No";
const listaIngredientes = JSON.parse(localStorage.getItem('listaIngredientes'));
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
var generar_Imagen = "No"

function activarGeneracionImagenes() {
  var btn = document.getElementById("btn_GeneracionImagenes");
  if (btn.textContent === "Generar Imagenes: SI") {
    window.alert("¡Recorda que si activas la generacion de imagenes las recetas tardarán más tiempo en generarse! Si quieres mejor rendimiento en cuanto a tiempo de espera te recomiendo desactivar esta opcion.")
    btn.textContent = "Generar Imagenes: NO"
    generar_Imagen = "Si"
    btn.style.backgroundColor = "rgb(203, 248, 209)";
  } else {
    btn.textContent = "Generar Imagenes: SI"
    generar_Imagen = "No"
    btn.style.backgroundColor = "rgb(244, 244, 243)";
  }
}

var prompt_Chefcito = "";

async function generarRecetas() {
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
    const recetasArray = recetas.split('\n\n'); // Suponiendo que las recetas están separadas por dobles saltos de línea
    console.log(recetas); // Verificar datos en la consola

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
    
    var OPENAI_API_KEY = "sk-proj-tKXaXeCaedNutsgbJa2iT3BlbkFJzE8nvjJJLGNQjR64UrfC";
  
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
          const recetaDiv = document.getElementById(`tarjeta_NuevaReceta_${i + 1}`);
          if (recetaDiv && imgData) {
            const imgElement = recetaDiv.querySelector(`#img_Recetas_${i + 1}`);
            imgElement.src = "data:image/jpeg;base64," + imgData;
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
    } catch (error) {
      console.error('Error al generar imágenes:', error);
    }
  }
  
}  
window.generarRecetas = generarRecetas;
window.onload = generarRecetas();
