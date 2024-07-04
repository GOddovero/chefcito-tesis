async function generarRecetas() {
  const prompt_Chefcito = "I need you to generate three recipes based on the list of ingredients that I will provide at the end. It is not necessary to use all the ingredients, but in the recipes you generate, there cannot be more ingredients than those (except water, sugar, and salt). I need you to generate an OUTPUT IN SPANISH in the following format (as this will allow me to handle the output better), I am giving you an example to always follow: ‘nombre’: (insert the name of the recipe), ‘descripción’: (the description of the recipe, basically how it looks) and nothing else, without preparation, ONLY NAME AND DESCRIPTION, plain text in that format.Make sure the output is in plain text and strictly follows this format, with 'nombre' and 'descripción' clearly indicated as shown in the example. Here is the list of ingredients: Remember to include 'nombre' before the name of the recipe and 'descripción' before the description of the same. You want an output in Spanish with the following structure: 'nombre': [name of the recipe] 'descripción': [description of the recipe]. List of ingredients: Pollo, Tomates, Lechuga, Pepino, Cebolla, Ajo, Zanahoria, Brócoli, Espinacas, Frijoles negros, Arroz, Queso mozzarella, Huevos, Pan rallado, Aceite de oliva, Vinagre balsámico, Sal, Azúcar, Café, Leche, Yogur griego, Pepino amargo, Champiñones, Cebolla roja, Pimienta, Orégano, Albahaca, Limón, Garbanzos, Papas";

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

    // Almacenar nombres y descripciones en arrays separados
    const nombresRecetas = [];
    const descripcionesRecetas = [];

    recetasArray.forEach((receta, index) => {
      // Dividir receta en nombre y descripción
      const recetaParts = receta.split("'nombre': ");
      if (recetaParts.length >= 2) {
        const recetaNombre = recetaParts[1].split("'descripción': ")[0].trim().replace(/'/g, '');
        const recetaDescripcion = recetaParts[1].split("'descripción': ")[1].trim().replace(/'/g, '');

        nombresRecetas[index] = recetaNombre;
        descripcionesRecetas[index] = recetaDescripcion;
      }
    });

    // Actualizar las otras tarjetas de recetas
    for (let i = 2; i <= 4; i++) {
      const recetaDiv = document.getElementById(`tarjeta_NuevaReceta_${i}`);
      if (recetaDiv && nombresRecetas[i - 1] && descripcionesRecetas[i - 1]) {
        const nombreElement = recetaDiv.querySelector(`#nombre_Receta_${i}`);
        const descripcionElement = recetaDiv.querySelector(`#descripcion_Receta_${i}`);

        nombreElement.textContent = nombresRecetas[i - 1];
        descripcionElement.textContent = descripcionesRecetas[i - 1];
      }
    }

    // Mensaje de éxito en la consola
    console.log("Recetas generadas y actualizadas correctamente.");

  } catch (error) {
    console.error('Error generando recetas:', error);
  }
}

// Asignar la función al objeto window
window.generarRecetas = generarRecetas;
