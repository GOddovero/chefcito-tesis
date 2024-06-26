fetch('/components/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('contenedor_navbar').innerHTML = data;
      })
      .catch(error => console.error('Error al cargar la barra de navegación:', error));