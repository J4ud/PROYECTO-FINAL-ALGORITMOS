//import SearchBar from '../../components/searchBar/searchBar'; no sé como hacer que busque algo
import Navbar from '../../components/navbar/navbar';
import { MenuButton } from '../../components/index';
import {SidebarMenu} from '../../components/index';
import { appState } from '../../store/store';
import { addObserver } from '../../store/store';

class Foros extends HTMLElement {
    navbar: Navbar;
    Menubutton: MenuButton;
    SidebarMenu: SidebarMenu;
    //aquí va lo del foro 
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      addObserver(this);
  
       // Instancia los componentes necesarios
   
      this.navbar = new Navbar();
      this.SidebarMenu = new SidebarMenu();
      this.Menubutton = new MenuButton();
      this.render();

      // Crea y configura el contenedor de tarjetas

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
   //aquí tambien pongo el componente de foros
   

   
   this.shadowRoot?.appendChild(css);
  

   

   // Crea el contenedor de la barra de navegación y añade los componentes necesarios

   this.shadowRoot?.appendChild(sidebarMenu);
   const searchContainer = this.ownerDocument.createElement('div');
   searchContainer.id = 'search-container';
   this.shadowRoot?.appendChild(searchContainer);
 }
//AH VRGA YA VÍ

 // Método para renderizar los caracteres (usuarios) como tarjetas
//  renderCharacters(data: any[]) {
//    const cardsContainer = this.ownerDocument.createElement('div');
//    cardsContainer.className = 'cards-container';

// //    data.forEach((user: any) => {
// //      const card = new Card();
// //      card.setAttribute(Attr.image, user.image);
// //      card.className = 'card';
// //      this.cardsContainer.appendChild(card);
// //    });

//    this.shadowRoot?.appendChild(cardsContainer);
//  }
 }
// // Define el elemento personalizado 'app-dashboard'
customElements.define('app-foros', Foros);
export default Foros;