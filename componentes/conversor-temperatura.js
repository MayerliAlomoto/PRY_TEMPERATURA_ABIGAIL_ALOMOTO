class ConversorTemperatura extends HTMLElement {

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

  
    let formato = this.getAttribute("formato");
    //Ingresar el valor por defecto
    if (!formato) formato = "C-F";    

  
    this.shadow.innerHTML = `
      <link rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

      <div class="card p-3">

        <h5 class="mb-3">Conversor de Temperatura</h5>

        <input type="number" class="form-control mb-3" placeholder="Ingrese valor">

        <select class="form-select mb-3">
          <option value="C-F">Celsius a Fahrenheit (C-F)</option>
          <option value="F-C">Fahrenheit a Celsius (F-C)</option>
        </select>

        <button class="btn btn-primary mb-3">Convertir</button>

        <div class="alert alert-info resultado" style="display:none;"></div>

      </div>
    `;


    // Inserta los elementos del shadow DOM
    this.input = this.shadow.querySelector("input");
    this.select = this.shadow.querySelector("select");
    this.resultado = this.shadow.querySelector(".resultado");

   
    this.select.value = formato;

  //Formula de conversion
    this.shadow.querySelector("button")
        .addEventListener("click", () => this.convertir());
  }

  convertir() {

  
    const valor = parseFloat(this.input.value);
    const tipo = this.select.value;

    if (isNaN(valor)) {
      this.resultado.style.display = "block";
      this.resultado.textContent = "Debe ingresar un número válido.";
      return;
    }

    let respuesta = 0;

  //Inserta forculas de conversion
    if (tipo === "C-F") {
      respuesta = (valor * 9 / 5) + 32;
    } else {
      respuesta = (valor - 32) * 5 / 9;
    }

    //Imprime el resultado

    this.resultado.style.display = "block";
    this.resultado.textContent = `Resultado: ${respuesta.toFixed(2)}`;
  }
}

//Define el elemento personalizado

customElements.define("conversor-temperatura", ConversorTemperatura);
