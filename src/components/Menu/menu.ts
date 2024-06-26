import { dispatch, emptyState } from "../../store/store";
import { ChangeScreen } from "../../store/actions";
import { Screens } from "../../types/navigation";
import { logout } from "../../store/actions";
// SidebarMenu.ts
class SidebarMenu extends HTMLElement {
  private _open: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    document.addEventListener('menu-toggle', this.toggle);
    document.addEventListener('click', this.handleOutsideClick, true);
  }

  disconnectedCallback() {
    document.removeEventListener('menu-toggle', this.toggle);
    document.removeEventListener('click', this.handleOutsideClick, true);
  }

  toggle = () => {
    this._open = !this._open;
    this.render();
  }

  handleOutsideClick = (event: MouseEvent) => {
    if (this._open && !this.shadowRoot?.contains(event.target as Node)) {
      this._open = false;
      this.render();
    }
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 250px;
            height: 100%;
            position: fixed;
            top: 0;
            left: ${this._open ? '0' : '-250px'};
            bottom: 0;
            transition: left 0.3s ease;
            background-color: #191916;
            color: white;
            box-shadow: 4px 0 5px rgba(0,0,0,0.5);
            z-index: 1000;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 20px 0;
          }
          li {
            padding: 15px 20px;
            border-bottom: 1px solid #444;
          }
          li:last-child {
            border-bottom: none;
          }
          button {
            color: white;
            background: none;
            border: none;
            text-align: left;
            width: 100%;
            padding: 15px 20px;
            cursor: pointer;
          }
          button:hover {
            background-color: #2a2a2a;
          }
        </style>
        <ul>
          <li><button id="menu">Menu</button></li>
          <li><button id="main">Main</button></li>
          <li><button id="profile">Profile</button></li>
          <li><button id="forum">Forum</button></li>
          <li><button id="posting">Posting</button></li>
          <li><button id="logout">Log Out</button></li>
          
        </ul>
      `;

      this.addEventListeners();
    }
  }
  logout = () => {
    // Limpiar IndexedDB
    indexedDB.deleteDatabase('firebaselocalStorageDb');
    indexedDB.deleteDatabase('firebase-heartbeat-database');

    // Restablecer el estado de la aplicación
    dispatch(logout(emptyState));

    // Redirigir al login
    dispatch(ChangeScreen(Screens.LOGIN));
  }



  addEventListeners() {
    this.shadowRoot?.querySelector('#profile')?.addEventListener('click', () => {
      console.log("Profile button clicked");
      dispatch(ChangeScreen(Screens.PROFILE));
    });
    
    this.shadowRoot?.querySelector('#forum')?.addEventListener('click', () => {
      dispatch(ChangeScreen(Screens.FOROS));
    });
    this.shadowRoot?.querySelector('#main')?.addEventListener('click', () => {
      dispatch(ChangeScreen(Screens.DASHBOARD));
    });
    this.shadowRoot?.querySelector('#posting')?.addEventListener('click', () => {
      dispatch(ChangeScreen(Screens.POSTING));
    });

    const logoutButton = this.shadowRoot?.querySelector('#logout')?.addEventListener('click',this.logout);
  
    };
  }


customElements.define('sidebar-menu', SidebarMenu);
export default SidebarMenu;
