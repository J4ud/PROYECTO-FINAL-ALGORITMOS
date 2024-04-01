import styles from "./navbar.css";

class Navbar extends HTMLElement {
  private bar: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.bar = "";
  }

  static get observedAttributes() {
    return ["bar"];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;

    shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class="navbar-container">
        <button id="menu-button">≡</button>
        <div class="navbar-title">${this.bar || "PALLETE"}</div>
      </div>
    `;

    const css = this.ownerDocument.createElement("style");
        css.textContent = `
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #1A1916;
            color: white;
            padding: 0 0;
            box-sizing: border-box;
            text-align: center;
            font-family: font-family: "Abril Fatface", serif;
            font-size: 30px;
            font-weight: 400;
            height: 70px;
            allign-items: center;
            display:flex;
            justify-items: center;
            z-index:1;
        
        }
        
        .navbar-container {
            display: flex;
            justify-content: space-between; /* Distribuye los elementos a lo largo del contenedor */
            align-items: center; /* Centra verticalmente los elementos */
            width: 100%;
        }
        
        #menu-button {
            margin-right: 10px; 
            background-color:#00000000; /* Hacer el botón transparente */
            border: none; /* Sin borde */
            cursor: pointer; /* Cursor apuntando */
            font-size: 30px; /* Tamaño de fuente heredado */
            color: rgb(240, 240, 240); 
            padding: 0px; /* Sin relleno */
            margin: 5px; /* Sin margen */
            height: 40px; /* Altura automática */
            width: 60px; /* Ancho automático */
            border-radius: 10px; /* Esquinas redondeadas */
        }
        
        #menu-button:active {
            background-color: rgb(66, 66, 66); /* Cambiar el color de fondo cuando se presiona el botón */
            color: white; /* Cambiar el color del texto cuando se presiona el botón */
        }
        
        .navbar-title {
            position: fixed;
            flex-grow: 1; /* Hace que el título ocupe el espacio restante */
            text-align: center; /* Centra horizontalmente el texto */
            font-weight: 400;
            width: 100%;
        }
        @media only screen and (max-width: 480px) {
          :host {
              height: auto;
              font-size: 20px;
          }

          #menu-button {
              font-size: 20px;
              height: 30px;
              width: 40px;
          }

          .navbar-title {
              display: block; /* Asegura que el título se muestre en pantallas pequeñas */
              font-size: 20px; /* Reduce el tamaño del título */
          }
      }
        `;

        this.shadowRoot?.appendChild(css);
  }

  attributeChangedCallback(propName: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      if (propName === "bar") {
        this.bar = newValue;
      }
      this.render();
    }
  }
}

customElements.define("custom-navbar", Navbar);
export default Navbar;