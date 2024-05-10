import './dashboard.css';
import { users } from "../../data/data";
import SearchBar from '../../components/searchBar/searchBar';
import Navbar from '../../components/navbar/navbar';
import Card, {Attr} from '../../components/Card/Card';
import { MenuButton } from '../../components/index';'./components/MenuButton/MenuButton';
import {SidebarMenu} from '../../components/index';'./components/Menu/menu';  // Asegúrate de que 'Menu/menu' es el archivo correcto para 'SidebarMenu'.
import { appState } from '../../store/store';
import { addObserver } from '../../store/store';

// <index></index>
class profile extends HTMLElement {
  searchBar: SearchBar;
  navbar: Navbar;
  cardsContainer: HTMLDivElement;
  Menubutton: MenuButton;
  SidebarMenu: SidebarMenu;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);

    this.searchBar = new SearchBar();
    this.navbar = new Navbar();
    this.SidebarMenu = new SidebarMenu();
    this.Menubutton = new MenuButton();

    this.render();

    this.cardsContainer = this.ownerDocument.createElement('div');
    this.cardsContainer.className = 'cards-container';
  }

  render() {
  
    console.log(appState)
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
    
    const menuButton = document.createElement('menu-button');
    const sidebarMenu = document.createElement('sidebar-menu');
    const navbarContainer = this.ownerDocument.createElement('div');
    navbarContainer.id = 'navbar-container';
    navbarContainer.appendChild(this.navbar);
    navbarContainer.appendChild(menuButton);
    this.shadowRoot?.appendChild(navbarContainer);

    const UserProfile = document.createElement('user-profile')
    this.shadowRoot?.appendChild(css);
    this.cardsContainer = this.ownerDocument.createElement('div');
    this.cardsContainer.className = 'cards-container';
    this.shadowRoot?.appendChild(this.cardsContainer);

    this.renderCharacters(users);

    

    this.shadowRoot?.appendChild(sidebarMenu);
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

customElements.define('app-profile', profile);
export default profile