var ingrediente_Principal_Activo = "No";

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

var prompt_Chefcito = "";

async function generarRecetas() {
  var select_Dieta = document.getElementById('select_Dieta').value;
  var select_Ingrediente_Principal = document.getElementById('select_IngredientePrincipal').value;

  if (select_Dieta == "Ninguna" && ingrediente_Principal_Activo == "No") {
    prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe], Different from the previous ones . List of ingredients: Pollo, Tomates, Lechuga, Pepino, Cebolla, Ajo, Zanahoria, Brócoli, Espinacas, Frijoles negros, Arroz, Queso mozzarella, Huevos, Pan rallado, Aceite de oliva, Vinagre balsámico, Sal, Azúcar, Café, Leche, Yogur griego, Pepino amargo, Champiñones, Cebolla roja, Pimienta, Orégano, Albahaca, Limón, Garbanzos, Papas";
    console.log("No se selecciono un tipo de dieta y no se activo ingreidente principal");
  } else if (select_Dieta == "Ninguna" && ingrediente_Principal_Activo == "Si") {
    prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe]. Keep in mind the following ingredient that has been selected as the main one:" + select_Ingrediente_Principal + " the generated recipe must include it. List of ingredients: Pollo, Tomates, Lechuga, Pepino, Cebolla, Ajo, Zanahoria, Brócoli, Espinacas, Frijoles negros, Arroz, Queso mozzarella, Huevos, Pan rallado, Aceite de oliva, Vinagre balsámico, Sal, Azúcar, Café, Leche, Yogur griego, Pepino amargo, Champiñones, Cebolla roja, Pimienta, Orégano, Albahaca, Limón, Garbanzos, Papas";
    console.log("No se selecciono un tipo de dieta , pero se seleccionó un ingrediente principal:", select_Ingrediente_Principal);
  } else {
    prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe]. You have selected the " + select_Dieta + " diet option, so you must strictly adhere to it when choosing ingredients. Keep in mind the following ingredient that has been selected as the main one:" + select_Ingrediente_Principal + ". List of ingredients: Pollo, Tomates, Lechuga, Pepino, Cebolla, Ajo, Zanahoria, Brócoli, Espinacas, Frijoles negros, Arroz, Queso mozzarella, Huevos, Pan rallado, Aceite de oliva, Vinagre balsámico, Sal, Azúcar, Café, Leche, Yogur griego, Pepino amargo, Champiñones, Cebolla roja, Pimienta, Orégano, Albahaca, Limón, Garbanzos, Papas";
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
  } catch (error) {
    console.error('Error generando recetas:', error);
  }
}

window.generarRecetas = generarRecetas;
window.onload = generarRecetas();