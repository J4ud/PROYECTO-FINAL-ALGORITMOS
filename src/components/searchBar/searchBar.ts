import Barstyles from "./searchBar.css"
export default class SearchBar extends HTMLElement {

   
        private inputElement: HTMLInputElement;
        private searchButton: HTMLButtonElement;

    constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.inputElement = document.createElement('input');
            this.inputElement.type = 'text';
            this.inputElement.placeholder = 'Buscar...';
    
            this.searchButton = document.createElement('button');
            this.searchButton.textContent = 'Buscar';
           
        }


    connectedCallback(): void {
        this.render(); 
        //this.loadStyles();
    }
 //lulu vos podes :D

 render(): void {
    const shadowRoot = this.shadowRoot;
    if (!shadowRoot) return;

    shadowRoot.innerHTML = `
        <style>
            ${Barstyles}
        </style>
        <div class="searchbar-container">
        <div class="search-bar"> <!-- Nuevo div para envolver input y botón -->
            <input type="text" class="search-input" placeholder="Buscar...">
            <button class="search-button">🔍︎</button>
        </div>
    </div>
    `;

    const css = this.ownerDocument.createElement("style");
    css.textContent = `
    :host{
        
        position: absolute;
        top: 0%;
        width:100%;
        allign-items: center;
    }
    
    .search-bar {
        display: flex; /* Usar flexbox para colocar los elementos en línea */
        width: 80%; /* Ancho deseado */
        padding: 0px; /* Espacio interno */
        margin: 90px auto;
        background-color: #1A1916; /* Color de fondo negro */
        z-index: 0.5;
        border-radius: 20px; /* Esquinas redondeadas */
    }
    
    search-bar{
        
    }

    .searchbar-container{
        display:flex;
    }

    .search-input {
        width: 100%; /* Ancho deseado */
        padding: 10px; /* Espacio interno */
        margin: 5px;
        border: none; /* Sin borde */
        border-radius: 20px; /* Esquinas redondeadas */
        background-color: #00000000; /* Color de fondo negro */
        color: white; /* Color del texto */
        text-align: center; /* Texto centrado */
        font-size: 16px; /* Tamaño de fuente */
        z-index: 0.5;
    }
    
    .search-button {
        background-color:#00000000; /* Hacer el botón transparente */
        border: none; /* Sin borde */
        cursor: pointer; /* Cursor apuntando */
        font-size: 25px; /* Tamaño de fuente heredado */
        color: rgb(240, 240, 240); 
        padding: 0px; /* Sin relleno */
        margin: 5px; /* Sin margen */
        height: 40px; /* Altura automática */
        width: 60px; /* Ancho automático */
        border-radius: 20px; /* Esquinas redondeadas */
    }
    .search-button:active {
        background-color: rgb(66, 66, 66); /* Cambiar el color de fondo cuando se presiona el botón */
        color: white; /* Cambiar el color del texto cuando se presiona el botón */
    }`;
    
    this.shadowRoot?.appendChild(css);
    
}

    //const cssprofile = this.ownerDocument.createElement("style");
   //cssprofile.innerHTML = Barstyles;
   //this.shadowRoot?.appendChild(cssprofile);
   
    //loadStyles() {
       //const SearchBar = this.ownerDocument.createElement("style");
      // SearchBar.innerHTML = Barstyles; 
     // this.shadowRoot?.appendChild(SearchBar);
   //}
}


customElements.define('search-bar', SearchBar);

