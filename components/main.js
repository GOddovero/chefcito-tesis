function activarIngredientePrincipal() {
    var button = document.getElementById("btn_IngredientePrincipal");
    if (button.textContent === "Activar") {
      button.textContent = "Desactivar";
      button.style.backgroundColor = "rgb(203, 248, 209)";
    } else {
      button.textContent = "Activar";
      button.style.backgroundColor = "rgb(244, 244, 243)";
    }
  }
