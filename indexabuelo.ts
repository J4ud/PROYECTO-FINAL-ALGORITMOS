import { data } from "./data/data";
import * as components from "./components/indexpadre";
import Navbar from "./components/navbar/navbar";
import SearchBar from "./components/searchBar/searchBar";



class AppContainer extends HTMLElement {
    searchBar: SearchBar;
    navbar: Navbar;


    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        // Crear una instancia de la barra de búsqueda
        this.searchBar = new SearchBar();

        this.navbar = new components.navbar();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <div class="app-container">
                    <div id="navbar-container"></div>
                    <div id="search-container"></div>
                    <div class="profiles-container"></div>
                </div>
            `;

            const navbarContainer = this.shadowRoot.querySelector('#navbar-container');
            navbarContainer?.appendChild(this.navbar);

            // Renderizar la barra de búsqueda
            const searchContainer = this.shadowRoot.querySelector('#search-container');
            searchContainer?.appendChild(this.searchBar);

        
        }
    }
}

customElements.define("app-container", AppContainer);

