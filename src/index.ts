import './index.css';
import { users } from "./data/data";
import SearchBar from './components/searchBar/searchBar';
import Navbar from './navbar/navbar';
import Card, {Attr} from './components/Card/Card';

// <index></index>
class AppContainer extends HTMLElement {
  searchBar: SearchBar;
  navbar: Navbar;
  cardsContainer: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.searchBar = new SearchBar();
    this.navbar = new Navbar();

    this.render();

    this.cardsContainer = this.ownerDocument.createElement('div');
    this.cardsContainer.className = 'cards-container';
  }

  render() {
    const css = this.ownerDocument.createElement("style");
    css.textContent = `
      .cards-container {
        max-width: 100%;
        column-count: 4;
        column-width: calc(20% - 5px);
        column-gap: 10px;
        margin: 10%
        
        
        
        
      }
      .image-button img{
        object-fit: cover;
      }

      .card {
        width: 100%;
        height: auto;
        margin-bottom: 0px;
        object-fit: cover;
      }

      .card img {
        width: 100%;
        height: auto;
        display: block
      }
      @media (max-width: 720px) {
        .cards-container {
          column-count: 3;
          margin-top: 150px;
        }
        
      } 
      @media (max-width: 480px) {
        .cards-container {
            column-count: 2; /* Cambiamos el número de columnas a 2 */
            margin-top: 120px;
        }
      }

    `;

    this.shadowRoot?.appendChild(css);
    this.cardsContainer = this.ownerDocument.createElement('div');
    this.cardsContainer.className = 'cards-container';
    this.shadowRoot?.appendChild(this.cardsContainer);

    this.renderCharacters(users);

    const navbarContainer = this.ownerDocument.createElement('div');
    navbarContainer.id = 'navbar-container';
    navbarContainer.appendChild(this.navbar);
    this.shadowRoot?.appendChild(navbarContainer);

    const searchContainer = this.ownerDocument.createElement('div');
    searchContainer.id = 'search-container';
    searchContainer.appendChild(this.searchBar);
    this.shadowRoot?.appendChild(searchContainer);
  }

  renderCharacters(data: any[]) {
    const cardsContainer = this.ownerDocument.createElement('div');
    cardsContainer.className = 'cards-container';

    data.forEach((user: any) => {
      const card = new Card();
      card.setAttribute(Attr.image, user.image);
      card.className = 'card';
      this.cardsContainer.appendChild(card);
    });

    this.shadowRoot?.appendChild(cardsContainer);
  }
}

customElements.define('app-container', AppContainer);