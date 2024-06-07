import './dashboard.css';
import { users } from "../../data/data";
import { appState } from '../../store/store';


import  MenuButton  from '../../components/MenuButton/MenuButton';
import SidebarMenu from '../../components/Menu/menu'
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
    
    
  

  }

 

    

    
  }


customElements.define('app-profile', Profile);
export default Profile
