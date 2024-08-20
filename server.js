const express = require('express');
const path = require('path');
const cors = require('cors');
const Groq = require("groq-sdk");

const app = express();
const PORT = 3000;
const API_PORT = 8000;
const API_KEY = "";

const groq = new Groq({
  apiKey: API_KEY
});

app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/index.html'));
});

// Ruta para manejar las solicitudes de completions
app.post("/completions", async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: req.body.message
        }
      ],
      model: "llama3-70b-8192"
    });
    res.send(response);
  } catch (error) {
    console.error("Error en la solicitud a la API de Groq:", error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : "Error en la solicitud a la API de Groq");
  }
});

// Iniciar servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Iniciar servidor API en el puerto 8000
const apiServer = express();
apiServer.use(express.json());
apiServer.use(cors());

apiServer.post("/completions", async (req, res) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: req.body.message
        }
      ],
      model: "llama3-70b-8192"
    });
    res.send(response);
  } catch (error) {
    console.error("Error en la solicitud a la API de Groq:", error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : "Error en la solicitud a la API de Groq");
  }
});

apiServer.listen(API_PORT, () => {
    console.log(`API Server escuchando en http://localhost:${API_PORT}`);
});
