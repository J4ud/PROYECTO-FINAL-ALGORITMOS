import './dashboard.css';
import SearchBar from '../../components/searchBar/searchBar';
import Navbar from '../../components/navbar/navbar';
import Card, { Attr } from '../../components/Card/Card';
import { MenuButton } from '../../components/index';
import { SidebarMenu } from '../../components/index';  // Asegúrate de que 'Menu/menu' es el archivo correcto para 'SidebarMenu'.
import { appState, addObserver, dispatch } from '../../store/store';
import { getPostsAction } from '../../store/actions';

// <index></index>
class Dashboard extends HTMLElement {
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

    this.cardsContainer = this.ownerDocument.createElement('div');
    this.cardsContainer.className = 'cards-container';

    this.render();
  }

  async connectedCallback() {
    if (appState.posts.length === 0) {
      const action = await getPostsAction();
      dispatch(action);
    } else {
      this.render();
    }
  }

  render() {
    if (this.shadowRoot) {
      console.log(appState);

      const css = this.ownerDocument.createElement('style');
      css.textContent = `
        :host {
          background-color: #EBE7DC;
        }

        .cards-container {
          max-width: 100%;
          column-count: 4;
          column-width: calc(20% - 5px);
          column-gap: 10px;
          margin: 10%;
        }

        .image-button img {
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
          display: block;
        }

        @media (max-width: 720px) {
          .cards-container {
            column-count: 3;
            margin-top: 150px;
          }
        }

        @media (max-width: 480px) {
          .cards-container {
            column-count: 2;
            margin-top: 120px;
          }
        }
      `;

      // Limpiar el shadowRoot existente antes de agregar nuevos elementos
      this.shadowRoot.innerHTML = '';

      const sidebarMenu = document.createElement('sidebar-menu');
      const navbarContainer = this.ownerDocument.createElement('div');
      navbarContainer.id = 'navbar-container';
      navbarContainer.appendChild(this.navbar);

      this.shadowRoot.appendChild(navbarContainer);
      this.shadowRoot.appendChild(css);
      this.shadowRoot.appendChild(this.cardsContainer);
      this.shadowRoot.appendChild(sidebarMenu);

      const searchContainer = this.ownerDocument.createElement('div');
      searchContainer.id = 'search-container';
      searchContainer.appendChild(this.searchBar);
      this.shadowRoot.appendChild(searchContainer);

      // Limpiar el contenido de cardsContainer antes de agregar nuevos elementos
      this.cardsContainer.innerHTML = '';

      appState.posts.forEach((post: any) => {
        const card = new Card();
        card.setAttribute(Attr.image, post.image);
        card.setAttribute(Attr.userName, post.userName);
        card.setAttribute(Attr.description, post.description);
        card.className = 'card';
        this.cardsContainer.appendChild(card);
      });
    }
  }
}

customElements.define('app-dashboard', Dashboard);
export default Dashboard;
