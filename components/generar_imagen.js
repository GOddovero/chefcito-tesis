const generateForm = document.querySelector(".generate-form");
const galeria_imagenes = document.querySelector(".galeria_imagenes");

const cambiarImagenes = (imgDataArray) => {
    imgDataArray.forEach((imgObject, index) => {
        const imgTarjeta = galeria_imagenes.querySelectorAll(".tarjeta_Imagen")[index];
        const imgElement = imgTarjeta.querySelector("img");

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;
    });
}

const OPENAI_API_KEY = "sk-proj-tKXaXeCaedNutsgbJa2iT3BlbkFJzE8nvjJJLGNQjR64UrfC";

const generateAiImages = async(userPrompt, userImgQuantity) => {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuantity, 10), // Convertir a número
                size: "256x256",
                response_format: "b64_json"
            })
        });

        if (!response.ok) throw new Error("Fallo al generar imágenes");

        const { data } = await response.json();
        cambiarImagenes(data); // Llama a la función para actualizar las imágenes
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const handleFormSubmission = (e) => {
    e.preventDefault();

    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    // Validar que el prompt no esté vacío
    if (!userPrompt.trim()) {
        alert("El prompt no puede estar vacío.");
        return;
    }

    generateAiImages(userPrompt, userImgQuantity);
}

generateForm.addEventListener("submit", handleFormSubmission);
