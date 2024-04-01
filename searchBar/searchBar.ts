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

