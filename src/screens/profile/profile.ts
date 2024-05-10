import './dashboard.css';
import { users } from "../../data/data";
import { appState } from '../../store/store';

import {MenuButton} from '../../components/index';
import {SidebarMenu} from '../../components/index';
import { addObserver } from '../../store/store';
import Navbar from '../../components/navbar/navbar';
class Profile extends HTMLElement {
  navbar: Navbar;
  Menubutton: MenuButton;
  SidebarMenu: SidebarMenu;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);

   
    this.navbar = new Navbar();
    this.SidebarMenu = new SidebarMenu();
    this.Menubutton = new MenuButton();

    this.render();

   
  }

  render() {
  
    console.log(appState)
    const css = this.ownerDocument.createElement("style");
    css.textContent = `
      

    `;
    
    const menuButton = document.createElement('menu-button');
    const sidebarMenu = document.createElement('sidebar-menu');
    const navbarContainer = this.ownerDocument.createElement('div');
    navbarContainer.id = 'navbar-container';
    navbarContainer.appendChild(this.navbar);
    navbarContainer.appendChild(menuButton);
    this.shadowRoot?.appendChild(navbarContainer);

    
    this.shadowRoot?.appendChild(css);
    this.shadowRoot?.appendChild(sidebarMenu);
  

  }

 

    

    
  }


customElements.define('app-profile', Profile);
export default Profile
